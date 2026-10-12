"""Ground-floor restaurant: dining room with the exposed supply trunk overhead
and an open kitchen with a stainless hood at the far end."""

import math

import bmesh
import bpy
from mathutils import Matrix, Vector

from . import common as C
from . import duct as D
from . import materials as M
from . import terrace as T

TABLE_XS = (-3.4, -1.0, 1.4, 3.8)
ROW_YS = (-2.8, 0.0, 2.8)
WIN_W, WIN_Z0, WIN_Z1 = 1.5, 0.95, 3.0


def _part(bm, Mw, size, loc, rot=None, mi=0):
    m = Mw @ C.trs(loc, rot, size)
    r = bmesh.ops.create_cube(bm, size=1.0, matrix=m)
    for v in r["verts"]:
        for f in v.link_faces:
            f.material_index = mi


def _chair(bm, Mw):
    _part(bm, Mw, (0.44, 0.44, 0.05), (0, 0, 0.46), mi=1)
    for sx in (1, -1):
        for sy in (1, -1):
            _part(bm, Mw, (0.035, 0.035, 0.44), (sx * 0.19, sy * 0.19, 0.22), mi=0)
    lean = Matrix.Rotation(math.radians(-8), 4, "Y")
    for sy in (1, -1):
        _part(bm, Mw, (0.035, 0.035, 0.46), (-0.215, sy * 0.19, 0.69), lean, mi=0)
    _part(bm, Mw, (0.03, 0.40, 0.24), (-0.235, 0, 0.80), lean, mi=1)


def _table(bm, x, y, mi_top=0, mi_base=2):
    C.bm_cyl(bm, 0.5, 0.04, (x, y, 0.75), "Z", mi_top, segs=48)
    C.bm_cyl(bm, 0.045, 0.70, (x, y, 0.38), "Z", mi_base, segs=16)
    C.bm_cyl(bm, 0.27, 0.03, (x, y, 0.015), "Z", mi_base, segs=32)
    for k in range(4):
        a = math.radians(45 + 90 * k)
        Mw = Matrix.Translation((x + 0.80 * math.cos(a), y + 0.80 * math.sin(a), 0)) @ Matrix.Rotation(a + math.pi, 4, "Z")
        _chair(bm, Mw)


def _setting(bm, x, y):
    """Plates, glasses and a brass vase of marigolds. Material slots:
    0 ceramic, 1 glass, 2 brass, 3 marigold, 4 leaf."""
    z = 0.77
    for k in range(4):
        a = math.radians(45 + 90 * k)
        px, py = x + 0.31 * math.cos(a), y + 0.31 * math.sin(a)
        C.bm_cyl(bm, 0.125, 0.012, (px, py, z + 0.006), "Z", 0, segs=28)
        C.bm_cyl(bm, 0.085, 0.004, (px, py, z + 0.014), "Z", 0, segs=28)
        g = a + math.radians(38)
        C.bm_cyl(bm, 0.03, 0.11, (x + 0.27 * math.cos(g), y + 0.27 * math.sin(g), z + 0.055), "Z", 1, segs=16)
    C.bm_cyl(bm, 0.045, 0.10, (x, y, z + 0.05), "Z", 2, segs=20, radius2=0.03)
    for dx, dy, dz in ((0.0, 0.0, 0.17), (0.035, 0.02, 0.14), (-0.03, 0.025, 0.145), (0.0, -0.04, 0.14)):
        m = Matrix.Translation((x + dx, y + dy, z + dz)) @ Matrix.Diagonal((0.028, 0.028, 0.022, 1))
        r = bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.0, matrix=m)
        for v in r["verts"]:
            for f in v.link_faces:
                f.material_index = 3
                f.smooth = True
    C.bm_cyl(bm, 0.02, 0.07, (x, y, z + 0.115), "Z", 4, segs=8, radius2=0.004)


def window_xs():
    return TABLE_XS


def build(collection):
    X, Y, Z = Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))
    ext = M.noisy("Parapet plaster", (0.50, 0.38, 0.24), (0.62, 0.49, 0.32), scale=0.9, rough=0.85, bump=0.35)
    plaster = M.noisy("Interior plaster", (0.42, 0.32, 0.23), (0.50, 0.39, 0.28), scale=1.2, rough=0.8, bump=0.2)
    dado = M.wood("Dado wood", (0.10, 0.05, 0.025), (0.22, 0.12, 0.055))
    ceiling = M.noisy("Ceiling charcoal", (0.022, 0.024, 0.027), (0.04, 0.042, 0.046), scale=3, rough=0.9, bump=0.3)
    floor = M.tiles("Floor tiles", (0.075, 0.07, 0.065), (0.105, 0.10, 0.09), grout=(0.03, 0.03, 0.03), size=0.8, rough=0.14)
    wtile = M.tiles("Kitchen wall tiles", (0.55, 0.57, 0.56), (0.62, 0.64, 0.63), grout=(0.30, 0.30, 0.29), size=0.15, rough=0.12)
    frame = M.simple("Window frame", (0.03, 0.032, 0.035), rough=0.45, metallic=0.7)
    stone = M.noisy("Sill stone", (0.30, 0.29, 0.27), (0.42, 0.41, 0.38), scale=12, rough=0.35, bump=0.1)
    wood = M.wood("Teak")
    fabric = M.noisy("Chair fabric", (0.018, 0.075, 0.07), (0.03, 0.11, 0.10), scale=60, rough=0.85, bump=0.5)
    metal = M.simple("Table base", (0.035, 0.035, 0.04), rough=0.4, metallic=0.8)
    ss = M.stainless()
    gi = M.galvanized()
    seam = M.duct_seam()
    flange_mat = M.galvanized("GI flange", tint=(0.56, 0.58, 0.60), spangle=140.0)
    ceramic = M.simple("Ceramic", (0.86, 0.85, 0.82), rough=0.12)
    glass = M.simple("Glass", (0.9, 0.95, 0.96), rough=0.02, transmission=1.0, ior=1.45)
    try:
        glass.use_raytrace_refraction = True
    except Exception:
        pass
    brass = M.simple("Brass", (0.80, 0.55, 0.20), rough=0.25, metallic=1.0)
    marigold = M.simple("Marigold", (0.95, 0.42, 0.02), rough=0.7)
    leaf = M.simple("Leaf", (0.05, 0.22, 0.05), rough=0.6)
    iron = M.simple("Cast iron", (0.015, 0.015, 0.017), rough=0.6, metallic=0.8)
    flame = M.emissive("Gas flame", (0.15, 0.4, 1.0), 14.0)
    shade = M.simple("Lamp shade", (0.012, 0.012, 0.014), rough=0.5, metallic=0.4)
    bulb = M.emissive("Lamp bulb", (1.0, 0.62, 0.30), 40.0)
    pot = M.noisy("Planter", (0.42, 0.20, 0.12), (0.55, 0.28, 0.17), scale=14, rough=0.8, bump=0.4)
    palm = M.noisy("Palm leaf", (0.03, 0.12, 0.035), (0.07, 0.22, 0.06), scale=9, rough=0.55, bump=0.3)

    t = C.WALL_T
    wins = [(x - WIN_W / 2, x + WIN_W / 2, WIN_Z0, WIN_Z1) for x in window_xs()]

    # --- shell ---------------------------------------------------------
    bm = bmesh.new()
    D.plate(bm, (0, C.Y0, 0), X, Z, Y, C.X0, C.X1, 0, C.ROOM_H, wins, t, 0)
    D.plate(bm, (0, C.Y1, 0), X, Z, -Y, C.X0, C.X1, 0, C.ROOM_H, wins, t, 0)
    D.plate(bm, (C.X0, 0, 0), Y, Z, X, C.Y0 + t, C.Y1 - t, 0, C.ROOM_H, [], t, 0)
    D.plate(bm, (C.X1, 0, 0), Y, Z, -X, C.Y0 + t, C.Y1 - t, 0, C.ROOM_H, [], t, 0)
    C.finish("Building walls", bm, collection, (ext,))

    bm = bmesh.new()
    lin = 0.012
    yi0, yi1 = C.Y0 + t, C.Y1 - t
    xi1 = C.X1 - t
    dz = 0.9
    # dining: plaster above a wood dado; kitchen: white tiles
    for (yy, n) in ((yi0, Y), (yi1, -Y)):
        D.plate(bm, (0, yy, 0), X, Z, n, C.DINING_X0, C.KITCHEN_X, dz, C.ROOM_H, wins, lin, 0)
        D.plate(bm, (0, yy, 0), X, Z, n, C.DINING_X0, C.KITCHEN_X, 0, dz, [], lin * 2, 1)
        C.bm_box(bm, (C.KITCHEN_X - C.DINING_X0, 0.04, 0.04), ((C.KITCHEN_X + C.DINING_X0) / 2, yy + n.y * 0.02, dz + 0.02), None, 1)
        D.plate(bm, (0, yy, 0), X, Z, n, C.KITCHEN_X, xi1, 0, C.ROOM_H, [], lin, 2)
    D.plate(bm, (xi1, 0, 0), Y, Z, -X, yi0, yi1, 0, C.ROOM_H, [], lin, 2)
    # partition between lobby and dining room
    D.plate(bm, (C.DINING_X0, 0, 0), Y, Z, -X, yi0, yi1, dz, C.ROOM_H, [], 0.12, 0)
    D.plate(bm, (C.DINING_X0, 0, 0), Y, Z, -X, yi0, yi1, 0, dz, [], 0.12, 1)
    D.plate(bm, (C.DINING_X0, 0, 0), Y, Z, X, yi0, yi1, 0, dz, [], lin * 2, 1)
    # ceiling under the slab, with the duct penetrations
    D.plate(bm, (0, 0, C.ROOM_H), X, Y, -Z, C.X0 + t, xi1, yi0, yi1, T.slab_holes(), lin, 3)
    # floor
    C.bm_box(bm, (C.X1 - C.X0, C.Y1 - C.Y0, 0.06), ((C.X0 + C.X1) / 2, 0, -0.03), None, 4)
    C.finish("Room lining", bm, collection, (plaster, dado, wtile, ceiling, floor))

    # --- windows: steel frames and stone sills -------------------------
    bm = bmesh.new()
    for s, yw in ((1, C.Y0 + t / 2), (-1, C.Y1 - t / 2)):
        for (xa, xb, za, zb) in wins:
            xc, zc = (xa + xb) / 2, (za + zb) / 2
            b = 0.05
            for zz in (za + b / 2, zb - b / 2, za + (zb - za) * 0.68):
                C.bm_box(bm, (xb - xa, 0.05, b), (xc, yw, zz), None, 0)
            for xx in (xa + b / 2, xb - b / 2, xc):
                C.bm_box(bm, (b, 0.05, zb - za), (xx, yw, zc), None, 0)
            C.bm_box(bm, (xb - xa + 0.12, t + 0.10, 0.04), (xc, yw, za - 0.02), None, 1)
    C.finish("Windows", bm, collection, (frame, stone), bevel=0.004)

    # --- facade: sunshades over the windows, plinth band, entrance -----
    band = M.noisy("Plinth band", (0.16, 0.12, 0.09), (0.22, 0.17, 0.12), scale=2, rough=0.85, bump=0.3)
    bm = bmesh.new()
    for s, yw in ((-1, C.Y0), (1, C.Y1)):
        for (xa, xb, za, zb) in wins:
            C.bm_box(bm, (xb - xa + 0.5, 0.55, 0.08), ((xa + xb) / 2, yw + s * 0.275, zb + 0.14), None, 0)
        C.bm_box(bm, (C.X1 - C.X0 + 0.08, 0.04, 0.5), ((C.X0 + C.X1) / 2, yw + s * 0.02, 0.25), None, 0)
    for s, xw in ((-1, C.X0), (1, C.X1)):
        C.bm_box(bm, (0.04, C.Y1 - C.Y0 + 0.08, 0.5), (xw + s * 0.02, 0, 0.25), None, 0)
    C.bm_box(bm, (0.06, 1.9, 2.35), (C.X0 - 0.03, -1.6, 1.175), None, 1)
    C.bm_box(bm, (1.5, 3.2, 0.1), (C.X0 - 0.75, -1.6, 2.7), None, 0)
    C.bm_box(bm, (1.1, 2.8, 0.16), (C.X0 - 0.55, -1.6, 0.08), None, 0)
    C.finish("Facade details", bm, collection, (band, dado), bevel=0.006)

    # --- tables, chairs and settings -----------------------------------
    bm = bmesh.new()
    spots = [(x, y) for y in ROW_YS for x in TABLE_XS if not (y == 0.0 and x == TABLE_XS[0])]
    for (x, y) in spots:
        _table(bm, x, y)
    C.finish("Tables and chairs", bm, collection, (wood, fabric, metal), bevel=0.006)

    bm = bmesh.new()
    for (x, y) in spots:
        _setting(bm, x, y)
    C.finish("Table settings", bm, collection, (ceramic, glass, brass, marigold, leaf))

    # --- pendant lamps over the side rows ------------------------------
    bm = bmesh.new()
    lamps = []
    for y in (ROW_YS[0], ROW_YS[2]):
        for x in TABLE_XS:
            zb = 2.3
            C.bm_cyl(bm, 0.004, C.ROOM_H - zb - 0.2, (x, y, (C.ROOM_H + zb + 0.2) / 2), "Z", 0, segs=6)
            C.bm_cyl(bm, 0.21, 0.2, (x, y, zb + 0.1), "Z", 0, segs=32, radius2=0.045)
            m = Matrix.Translation((x, y, zb + 0.03)) @ Matrix.Diagonal((0.05, 0.05, 0.05, 1))
            r = bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.0, matrix=m)
            for v in r["verts"]:
                for f in v.link_faces:
                    f.material_index = 1
                    f.smooth = True
            lamps.append((x, y, zb - 0.06))
    C.finish("Pendant lamps", bm, collection, (shade, bulb))

    # --- planters in the corners ---------------------------------------
    bm = bmesh.new()
    for (x, y) in ((C.DINING_X0 + 0.6, yi0 + 0.6), (C.DINING_X0 + 0.6, yi1 - 0.6), (C.KITCHEN_X - 0.7, yi0 + 0.6), (C.KITCHEN_X - 0.7, yi1 - 0.6)):
        C.bm_cyl(bm, 0.26, 0.5, (x, y, 0.25), "Z", 0, segs=24, radius2=0.2)
        for k in range(11):
            a = k * 2.399
            tilt = math.radians(18 + (k % 4) * 12)
            rot = Matrix.Rotation(a, 4, "Z") @ Matrix.Rotation(tilt, 4, "Y")
            ln = 0.9 + (k % 3) * 0.25
            mm = Matrix.Translation((x, y, 0.5)) @ rot @ Matrix.Translation((0, 0, ln / 2)) @ Matrix.Diagonal((0.012, 0.11, ln, 1))
            r = bmesh.ops.create_cube(bm, size=1.0, matrix=mm)
            for v in r["verts"]:
                for f in v.link_faces:
                    f.material_index = 1
    C.finish("Planters", bm, collection, (pot, palm))

    # --- open kitchen ---------------------------------------------------
    bm = bmesh.new()
    kx = C.KITCHEN_X
    # pass counter: wood front, stainless top
    C.bm_box(bm, (0.6, 6.8, 1.02), (kx + 0.3, 0, 0.51), None, 1)
    C.bm_box(bm, (0.74, 6.9, 0.04), (kx + 0.3, 0, 1.04), None, 0)
    for i in range(34):
        C.bm_box(bm, (0.02, 0.09, 0.96), (kx - 0.01, -3.3 + i * 0.2, 0.5), None, 1)
    # cooking range against the back wall
    rx0 = xi1 - 0.82
    rxc = (rx0 + xi1) / 2
    C.bm_box(bm, (0.82, 4.8, 0.86), (rxc, 0, 0.43), None, 0)
    C.bm_box(bm, (0.04, 4.8, 0.3), (xi1 - 0.03, 0, 1.01), None, 0)
    for by in (-1.65, -0.55, 0.55, 1.65):
        C.bm_cyl(bm, 0.15, 0.03, (rxc - 0.05, by, 0.875), "Z", 2, segs=24)
        C.bm_cyl(bm, 0.10, 0.012, (rxc - 0.05, by, 0.895), "Z", 3, segs=24)
    C.bm_cyl(bm, 0.19, 0.24, (rxc - 0.05, -1.65, 1.02), "Z", 0, segs=32)
    C.bm_cyl(bm, 0.16, 0.30, (rxc - 0.05, 0.55, 1.05), "Z", 0, segs=32)
    C.bm_cyl(bm, 0.24, 0.10, (rxc - 0.05, -0.55, 0.95), "Z", 2, segs=32, radius2=0.12)
    C.finish("Kitchen counters", bm, collection, (ss, wood, iron, flame), bevel=0.004)

    # hood: canopy with a baffle-filter bank and the exhaust collar
    bm = bmesh.new()
    hx0, hx1 = xi1 - 1.06, xi1
    hy = 2.5
    hz0, hz1 = 2.0, 2.62
    hxc = (hx0 + hx1) / 2
    sk = 0.012
    C.bm_box(bm, (sk, 2 * hy, hz1 - hz0), (hx0 + sk / 2, 0, (hz0 + hz1) / 2), None, 0)
    for s in (1, -1):
        C.bm_box(bm, (hx1 - hx0, sk, hz1 - hz0), (hxc, s * (hy - sk / 2), (hz0 + hz1) / 2), None, 0)
    C.bm_box(bm, (hx1 - hx0, 2 * hy, sk), (hxc, 0, hz1 - sk / 2), None, 0)
    C.bm_box(bm, (0.05, 2 * hy + 0.02, 0.05), (hx0 + 0.01, 0, hz0 + 0.025), None, 0)
    # filters lean back towards the wall
    lean = Matrix.Rotation(math.radians(38), 4, "Y")
    fc = Vector((hxc + 0.05, 0, hz0 + 0.3))
    C.bm_box(bm, (0.03, 2 * hy - 0.1, 0.62), fc, lean, 0)
    for i in range(60):
        yy = -hy + 0.1 + i * ((2 * hy - 0.2) / 59)
        C.bm_box(bm, (0.045, 0.028, 0.56), fc + Vector((0, yy, 0)), lean, 1)
    # collar and riser up through the slab
    D.straight(bm, (T.EXHAUST_X, 0, hz1), (T.EXHAUST_X, 0, C.TERRACE_Z - 0.05), Y, -X, T.EXHAUST_S, T.EXHAUST_S, every=0.7)
    C.finish("Kitchen hood", bm, collection, (ss, iron, flange_mat, gi))

    return {"lamps": lamps, "wins": wins, "hood": (hxc, hy, hz0)}
