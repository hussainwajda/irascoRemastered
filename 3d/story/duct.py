"""Rectangular GI ductwork: straight runs with cross-broken panels and angle
flanges, radius elbows, reducers, plenum, grilles and the opening damper."""

import math

import bmesh
import bpy
from mathutils import Matrix, Vector

from . import common as C
from . import materials as M

FLANGE_EVERY = 1.2
FLANGE_P = 0.035  # how far the angle flange stands proud of the duct
MI_SHEET, MI_SEAM, MI_FLANGE = 0, 1, 2


def frame_rot(T, A, B):
    """Rotation taking local X/Y/Z to the duct's travel/across/up directions."""
    return Matrix((T, A, B)).transposed().to_4x4()


def ring(o, A, B, w, h):
    return [
        o - A * (w / 2) - B * (h / 2),
        o + A * (w / 2) - B * (h / 2),
        o + A * (w / 2) + B * (h / 2),
        o - A * (w / 2) + B * (h / 2),
    ]


def flange(bm, o, T, A, B, w, h, length=0.022, p=FLANGE_P):
    R = frame_rot(T, A, B)
    for s in (1, -1):
        C.bm_box(bm, (length, w + 2 * p, p), o + B * s * (h / 2 + p / 2), R, MI_FLANGE)
        C.bm_box(bm, (length, p, h), o + A * s * (w / 2 + p / 2), R, MI_FLANGE)
    # the joint line as it reads from inside the duct
    sl, st = 0.016, 0.005
    for s in (1, -1):
        C.bm_box(bm, (sl, w, st), o + B * s * (h / 2 - st / 2), R, MI_SEAM)
        C.bm_box(bm, (sl, st, h), o + A * s * (w / 2 - st / 2), R, MI_SEAM)


def panel(bm, a, b, c, d, out, crossbreak):
    """One duct side between two joints, creased corner to corner like real sheet."""
    centre = (a + b + c + d) / 4 + out * crossbreak
    vs = [bm.verts.new(p) for p in (a, b, c, d)]
    vc = bm.verts.new(centre)
    for i in range(4):
        f = bm.faces.new((vs[i], vs[(i + 1) % 4], vc))
        f.material_index = MI_SHEET


def straight(bm, p0, p1, A, B, w, h, every=FLANGE_EVERY, crossbreak=0.012, flange_start=True, flange_end=True, joints=None):
    p0, p1 = Vector(p0), Vector(p1)
    T = (p1 - p0).normalized()
    length = (p1 - p0).length
    n = max(1, round(length / every))
    for i in range(n):
        a = p0 + T * (length * i / n)
        b = p0 + T * (length * (i + 1) / n)
        ra, rb = ring(a, A, B, w, h), ring(b, A, B, w, h)
        outs = (-B, A, B, -A)
        for k in range(4):
            panel(bm, ra[k], ra[(k + 1) % 4], rb[(k + 1) % 4], rb[k], outs[k], crossbreak)
        if i > 0 or flange_start:
            flange(bm, a, T, A, B, w, h)
            if joints is not None:
                joints.append(a.copy())
    if flange_end:
        flange(bm, p1, T, A, B, w, h)
        if joints is not None:
            joints.append(p1.copy())


def loft(bm, frames, smooth=True):
    """Sweep a rectangle through (origin, A, B, w, h) frames. Each side keeps its
    own vertices so the corners stay crisp while the bend shades smoothly."""
    rings = [ring(Vector(o), A, B, w, h) for (o, A, B, w, h) in frames]
    for k in range(4):
        prev = None
        for r in rings:
            cur = (bm.verts.new(r[k]), bm.verts.new(r[(k + 1) % 4]))
            if prev:
                f = bm.faces.new((prev[0], prev[1], cur[1], cur[0]))
                f.material_index = MI_SHEET
                f.smooth = smooth
            prev = cur


def elbow_down(bm, start, w, h, radius=None, segs=12):
    """90 degree bend from travelling +X to travelling -Z. Returns the end point."""
    radius = radius or C.ELBOW_R
    start = Vector(start)
    centre = start - Vector((0, 0, radius))
    X, Y, Z = Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))
    frames = []
    for i in range(segs + 1):
        th = (math.pi / 2) * i / segs
        o = centre + radius * (math.sin(th) * X + math.cos(th) * Z)
        Bv = math.sin(th) * X + math.cos(th) * Z
        frames.append((o, Y, Bv, w, h))
    loft(bm, frames)
    flange(bm, start, X, Y, Z, w, h)
    end = centre + radius * X
    flange(bm, end, -Z, Y, X, w, h)
    return end


def plate(bm, origin, U, V, N, u0, u1, v0, v1, holes, thickness, mi=0):
    """A slab in the U/V plane (thickness along N, starting at origin) with
    rectangular holes given as (ua, ub, va, vb)."""
    us = sorted({u0, u1, *[x for hh in holes for x in hh[:2] if u0 < x < u1]})
    vs = sorted({v0, v1, *[x for hh in holes for x in hh[2:] if v0 < x < v1]})
    R = frame_rot(U, V, N)
    for i in range(len(us) - 1):
        for j in range(len(vs) - 1):
            cu, cv = (us[i] + us[i + 1]) / 2, (vs[j] + vs[j + 1]) / 2
            if any(hh[0] < cu < hh[1] and hh[2] < cv < hh[3] for hh in holes):
                continue
            loc = Vector(origin) + U * cu + V * cv + N * (thickness / 2)
            C.bm_box(bm, (us[i + 1] - us[i], vs[j + 1] - vs[j], thickness), loc, R, mi)


def grille(bm, o, N, U, V, w, h, blades=7, mi_frame=0, mi_blade=1):
    """Supply grille on a duct side. N points out of the duct."""
    R = frame_rot(N, U, V)
    fr, depth = 0.03, 0.03
    c = Vector(o) + N * (depth / 2)
    for s in (1, -1):
        C.bm_box(bm, (depth, w + 2 * fr, fr), c + V * s * (h / 2 + fr / 2), R, mi_frame)
        C.bm_box(bm, (depth, fr, h), c + U * s * (w / 2 + fr / 2), R, mi_frame)
    tilt = Matrix.Rotation(math.radians(-22), 4, "Y")
    for i in range(blades):
        z = -h / 2 + h * (i + 0.5) / blades
        C.bm_box(bm, (depth * 1.15, w, 0.004), c + V * z, R @ tilt, mi_blade)
    # dark throat behind the blades
    C.bm_box(bm, (0.004, w, h), Vector(o) + N * 0.002, R, 2)


def build_supply(collection):
    """The whole supply route from the cooler discharge to the room trunk."""
    gi = M.galvanized()
    seam = M.duct_seam()
    flange_mat = M.galvanized("GI flange", tint=(0.56, 0.58, 0.60), spangle=140.0)
    canvas = M.noisy("Canvas connector", (0.05, 0.05, 0.055), (0.11, 0.11, 0.12), scale=40, rough=0.9, bump=0.5)

    X, Y, Z = Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))
    face_x = C.COOLER_X + C.COOLER_S / 2
    az = C.AXIS_Z

    # --- terrace run -------------------------------------------------
    bm = bmesh.new()
    collar_end = face_x + 0.08
    canvas_end = collar_end + 0.14
    red_end = canvas_end + 0.6
    loft(bm, [(Vector((face_x, 0, az)), Y, Z, 0.8, 0.8), (Vector((collar_end, 0, az)), Y, Z, 0.8, 0.8)], smooth=False)
    flange(bm, Vector((collar_end, 0, az)), X, Y, Z, 0.8, 0.8)
    flange(bm, Vector((canvas_end, 0, az)), X, Y, Z, 0.8, 0.8)
    # reducer 800x800 -> 800x600
    loft(bm, [(Vector((canvas_end, 0, az)), Y, Z, 0.8, 0.8), (Vector((red_end, 0, az)), Y, Z, C.DUCT_W, C.DUCT_H)], smooth=False)
    elbow_start = Vector((C.DROP_X - C.ELBOW_R, 0, az))
    joints = []
    straight(bm, (red_end, 0, az), elbow_start, Y, Z, C.DUCT_W, C.DUCT_H, flange_end=False, joints=joints)
    joints.append(elbow_start.copy())
    drop_top = elbow_down(bm, elbow_start, C.DUCT_W, C.DUCT_H)
    plenum_top = C.PLENUM_Z + 0.35
    # vertical drop: across = Y, "up" = +X
    joints.append(drop_top.copy())
    straight(bm, drop_top, (C.DROP_X, 0, plenum_top), Y, X, C.DUCT_W, C.DUCT_H, every=0.9, flange_start=False, flange_end=True, joints=joints)
    terrace_run = C.finish("Supply duct", bm, collection, (gi, seam, flange_mat))

    bm = bmesh.new()
    loft(bm, [(Vector((collar_end, 0, az)), Y, Z, 0.8, 0.8), (Vector((canvas_end, 0, az)), Y, Z, 0.8, 0.8)], smooth=False)
    C.finish("Canvas connector", bm, collection, (canvas,))

    # --- plenum box with the damper opening underneath ----------------
    bm = bmesh.new()
    px, pz = C.DROP_X, C.PLENUM_Z
    ps, ph, t = 1.1, 0.7, 0.004
    half = ps / 2
    # top (hole for the drop), bottom (hole for the damper)
    plate(bm, (px, 0, pz + ph / 2), X, Y, -Z, -half, half, -half, half, [(-C.DUCT_H / 2, C.DUCT_H / 2, -C.DUCT_W / 2, C.DUCT_W / 2)], t)
    plate(bm, (px, 0, pz - ph / 2), X, Y, Z, -half, half, -half, half, [(-0.35, 0.35, -0.35, 0.35)], t)
    # +X face with the trunk take-off, -X face solid
    plate(bm, (px + half, 0, pz), Y, Z, -X, -half, half, -ph / 2, ph / 2, [(-C.TRUNK_W / 2, C.TRUNK_W / 2, -C.TRUNK_H / 2, C.TRUNK_H / 2)], t)
    plate(bm, (px - half, 0, pz), Y, Z, X, -half, half, -ph / 2, ph / 2, [], t)
    for s in (1, -1):
        plate(bm, (px, s * half, pz), X, Z, Vector((0, -s, 0)), -half, half, -ph / 2, ph / 2, [], t)
    # collar under the damper
    for s in (1, -1):
        C.bm_box(bm, (0.76, 0.03, 0.07), (px, s * 0.365, pz - ph / 2 - 0.035), None, MI_FLANGE)
        C.bm_box(bm, (0.03, 0.70, 0.07), (px + s * 0.365, 0, pz - ph / 2 - 0.035), None, MI_FLANGE)
    C.finish("Plenum", bm, collection, (gi, seam, flange_mat))

    # --- room trunk ----------------------------------------------------
    bm = bmesh.new()
    t0 = Vector((px + half, 0, pz))
    t1 = Vector((C.TRUNK_END_X, 0, pz))
    straight(bm, t0, t1, Y, Z, C.TRUNK_W, C.TRUNK_H, flange_start=True, flange_end=True)
    C.bm_box(bm, (0.004, C.TRUNK_W, C.TRUNK_H), t1, None, MI_SHEET)
    C.finish("Room trunk", bm, collection, (gi, seam, flange_mat))

    # grilles down both sides of the trunk
    white = M.simple("Grille white", (0.82, 0.83, 0.84), rough=0.35)
    throat = M.simple("Grille throat", (0.01, 0.012, 0.015), rough=0.9)
    bm = bmesh.new()
    xs = [0.5, 1.7, 2.9, 4.0]
    for gx in xs:
        for s in (1, -1):
            grille(bm, (gx, s * C.TRUNK_W / 2, pz), Vector((0, s, 0)), X, Z, 0.6, 0.26, mi_frame=0, mi_blade=1)
    C.finish("Supply grilles", bm, collection, (white, white, throat))

    # hangers: threaded rod and a slotted angle under the trunk
    bm = bmesh.new()
    for hx in (0.1, 1.3, 2.5, 3.6, 4.5):
        C.bm_box(bm, (0.04, C.TRUNK_W + 0.16, 0.04), (hx, 0, pz - C.TRUNK_H / 2 - 0.02), None, 0)
        for s in (1, -1):
            C.bm_cyl(bm, 0.006, C.ROOM_H - (pz - C.TRUNK_H / 2 - 0.04), (hx, s * (C.TRUNK_W / 2 + 0.05), (C.ROOM_H + pz - C.TRUNK_H / 2 - 0.04) / 2), "Z", 0, segs=8)
    for s in (1, -1):
        for sx in (1, -1):
            zz = pz + 0.35
            C.bm_cyl(bm, 0.006, C.ROOM_H - zz, (px + sx * 0.5, s * 0.5, (C.ROOM_H + zz) / 2), "Z", 0, segs=8)
    C.finish("Duct hangers", bm, collection, (flange_mat,))

    # --- opening damper under the plenum ------------------------------
    blade_mat = M.galvanized("GI damper", tint=(0.70, 0.72, 0.74), spangle=90.0)
    blades = []
    chord = 0.7 / 4
    for i in range(4):
        bm = bmesh.new()
        C.bm_box(bm, (chord - 0.004, 0.69, 0.004), (0, 0, 0), None, 0)
        C.bm_cyl(bm, 0.008, 0.72, (0, 0, 0), "Y", 0, segs=10)
        ob = C.finish(f"Damper blade {i + 1}", bm, collection, (blade_mat,))
        ob.location = (px - 0.35 + chord * (i + 0.5), 0, pz - ph / 2 - 0.035)
        ob["open_sign"] = 1 if i % 2 == 0 else -1
        blades.append(ob)

    # --- stands under the terrace run ---------------------------------
    bm = bmesh.new()
    ms = M.noisy("MS angle painted", (0.07, 0.08, 0.09), (0.13, 0.13, 0.14), scale=30, rough=0.6, metallic=0.5, bump=0.2)
    under = az - C.DUCT_H / 2
    sx = red_end + 0.5
    while sx < elbow_start.x:
        C.bm_box(bm, (0.05, C.DUCT_W + 0.24, 0.05), (sx, 0, under - 0.025), None, 0)
        for s in (1, -1):
            hgt = under - C.TERRACE_Z
            C.bm_box(bm, (0.05, 0.05, hgt), (sx, s * (C.DUCT_W / 2 + 0.095), C.TERRACE_Z + hgt / 2), None, 0)
            C.bm_box(bm, (0.16, 0.16, 0.012), (sx, s * (C.DUCT_W / 2 + 0.095), C.TERRACE_Z + 0.006), None, 0)
        sx += 1.9
    C.finish("Duct stands", bm, collection, (ms,))

    return {"terrace_run": terrace_run, "joints": joints, "blades": blades, "red_end": red_end, "elbow_start": elbow_start, "drop_top": drop_top}
