"""Ductable evaporative cooler: steel body on an angle stand, honeycomb pads
behind louvres on three sides, axial fan discharging into the duct on +X.
No brand marks: IRASCO's dealer status for any cooler brand is unconfirmed."""

import math

import bmesh
import bpy
from mathutils import Matrix, Vector

from . import common as C
from . import materials as M

FAN_R = 0.36
FAN_BLADES = 4


def _louvre_side(bm, centre, N, U, w, h, mi_frame, mi_slat, mi_pad):
    """Pad wall facing N. U is the horizontal direction along the wall."""
    Z = Vector((0, 0, 1))
    R = Matrix((N, U, Z)).transposed().to_4x4()
    c = Vector(centre)
    fr = 0.035
    for s in (1, -1):
        C.bm_box(bm, (0.03, w, fr), c + Z * s * (h / 2 - fr / 2) - N * 0.015, R, mi_frame)
        C.bm_box(bm, (0.03, fr, h), c + U * s * (w / 2 - fr / 2) - N * 0.015, R, mi_frame)
    C.bm_box(bm, (0.03, fr * 0.8, h), c - N * 0.015, R, mi_frame)
    n = 15
    tilt = Matrix.Rotation(math.radians(38), 4, "Y")
    for i in range(n):
        z = -h / 2 + fr + (h - 2 * fr) * (i + 0.5) / n
        C.bm_box(bm, (0.055, w - 2 * fr, 0.004), c + Z * z - N * 0.03, R @ tilt, mi_slat)
    C.bm_box(bm, (0.10, w - 0.02, h - 0.02), c - N * 0.115, R, mi_pad)


def _holed_plate(bm, centre, w, h, radius, segs=40, mi=0):
    """Sheet in the YZ plane with a round fan opening."""
    c = Vector(centre)
    inner, outer = [], []
    for i in range(segs):
        a = 2 * math.pi * i / segs
        dy, dz = math.cos(a), math.sin(a)
        inner.append(bm.verts.new(c + Vector((0, dy * radius, dz * radius))))
        k = min((w / 2) / abs(dy) if abs(dy) > 1e-6 else 1e9, (h / 2) / abs(dz) if abs(dz) > 1e-6 else 1e9)
        outer.append(bm.verts.new(c + Vector((0, dy * k, dz * k))))
    for i in range(segs):
        j = (i + 1) % segs
        f = bm.faces.new((inner[i], inner[j], outer[j], outer[i]))
        f.material_index = mi


def _fan(collection, mat_blade, mat_hub):
    bm = bmesh.new()
    C.bm_cyl(bm, 0.075, 0.11, (0, 0, 0), "X", 1, segs=24)
    C.bm_cyl(bm, 0.03, 0.02, (0.06, 0, 0), "X", 1, segs=16)
    r0, r1 = 0.06, FAN_R - 0.02
    steps = 5
    for b in range(FAN_BLADES):
        base = 2 * math.pi * b / FAN_BLADES
        rows = []
        for i in range(steps + 1):
            t = i / steps
            r = C.lerp(r0, r1, t)
            chord = C.lerp(0.13, 0.21, math.sin(t * math.pi * 0.62))
            pitch = math.radians(C.lerp(40, 22, t))
            half_ang = (chord * math.cos(pitch) / 2) / r
            dx = chord * math.sin(pitch) / 2
            row = []
            for s in (-1, 0, 1):
                ang = base + s * half_ang
                row.append(bm.verts.new(Vector((s * dx, r * math.cos(ang), r * math.sin(ang)))))
            rows.append(row)
        for i in range(steps):
            for k in range(2):
                f = bm.faces.new((rows[i][k], rows[i][k + 1], rows[i + 1][k + 1], rows[i + 1][k]))
                f.material_index = 0
                f.smooth = True
    ob = C.finish("Cooler fan", bm, collection, (mat_blade, mat_hub))
    sol = ob.modifiers.new("Solidify", "SOLIDIFY")
    sol.thickness = 0.004
    sol.offset = 0
    return ob


def build(collection):
    body = M.xrayify(M.noisy("Cooler body", (0.80, 0.82, 0.83), (0.88, 0.89, 0.90), scale=3, rough=0.42, bump=0.05))
    trim = M.xrayify(M.noisy("Cooler trim blue", (0.035, 0.12, 0.33), (0.05, 0.16, 0.42), scale=4, rough=0.38, bump=0.05))
    slat = M.xrayify(M.simple("Cooler louvre", (0.74, 0.76, 0.78), rough=0.4))
    pad = M.xrayify(M.pad(), keep=0.24)
    steel = M.noisy("MS angle painted", (0.07, 0.08, 0.09), (0.13, 0.13, 0.14), scale=30, rough=0.6, metallic=0.5, bump=0.2)
    fan_blade = M.simple("Fan blade", (0.62, 0.64, 0.66), rough=0.3, metallic=1.0)
    dark = M.simple("Motor dark", (0.03, 0.03, 0.035), rough=0.5, metallic=0.6)
    water = M.simple("Water", (0.02, 0.10, 0.16), rough=0.04, metallic=0.0, spec=1.0)
    pvc = M.simple("PVC pipe", (0.78, 0.78, 0.74), rough=0.45)

    cx, cy, z0 = C.COOLER_X, C.COOLER_Y, C.COOLER_Z0
    S, H = C.COOLER_S, C.COOLER_H
    az = C.AXIS_Z
    tank_h, lid_h = 0.22, 0.08
    open_h = H - tank_h - lid_h
    X, Y, Z = Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))

    # --- shell: fades to a wireframe during the x-ray beat -------------
    bm = bmesh.new()
    # tank as an open tray so the water inside is visible
    wall = 0.012
    C.bm_box(bm, (S, S, wall), (cx, cy, z0 + wall / 2), None, 1)
    for s in (1, -1):
        C.bm_box(bm, (S, wall, tank_h), (cx, cy + s * (S / 2 - wall / 2), z0 + tank_h / 2), None, 1)
        C.bm_box(bm, (wall, S, tank_h), (cx + s * (S / 2 - wall / 2), cy, z0 + tank_h / 2), None, 1)
    C.bm_box(bm, (S + 0.06, S + 0.06, lid_h), (cx, cy, z0 + H - lid_h / 2), None, 1)
    for sx in (1, -1):
        for sy in (1, -1):
            C.bm_box(bm, (0.06, 0.06, open_h), (cx + sx * (S / 2 - 0.03), cy + sy * (S / 2 - 0.03), z0 + tank_h + open_h / 2), None, 0)
    pw = S - 0.12
    _louvre_side(bm, (cx - S / 2, cy, z0 + tank_h + open_h / 2), -X, Y, pw, open_h, 0, 2, 3)
    _louvre_side(bm, (cx, cy - S / 2, z0 + tank_h + open_h / 2), -Y, X, pw, open_h, 0, 2, 3)
    _louvre_side(bm, (cx, cy + S / 2, z0 + tank_h + open_h / 2), Y, X, pw, open_h, 0, 2, 3)
    _holed_plate(bm, (cx + S / 2 - 0.006, cy, z0 + tank_h + open_h / 2), pw, open_h, FAN_R + 0.012, mi=0)
    shell = C.finish("Cooler shell", bm, collection, (body, trim, slat, pad), bevel=0.004)

    # construction lines for the x-ray beat: the shell's real edges, no diagonals
    cbm = bmesh.new()
    zc = z0 + tank_h + open_h / 2
    C.bm_box(cbm, (S + 0.004, S + 0.004, tank_h), (cx, cy, z0 + tank_h / 2))
    C.bm_box(cbm, (S + 0.064, S + 0.064, lid_h), (cx, cy, z0 + H - lid_h / 2))
    for sx in (1, -1):
        for sy in (1, -1):
            C.bm_box(cbm, (0.064, 0.064, open_h), (cx + sx * (S / 2 - 0.03), cy + sy * (S / 2 - 0.03), zc))
    C.bm_box(cbm, (0.10, pw - 0.02, open_h - 0.02), (cx - S / 2 + 0.115, cy, zc))
    for s in (1, -1):
        C.bm_box(cbm, (pw - 0.02, 0.10, open_h - 0.02), (cx, cy + s * (S / 2 - 0.115), zc))
    C.bm_cyl(cbm, FAN_R + 0.014, 0.24, (cx + S / 2 - 0.12, cy, az), "X", 0, segs=20, smooth=False)
    cage = C.finish("Cooler xray cage", cbm, collection, (M.xray_cage(),))
    wire = cage.modifiers.new("Wire", "WIREFRAME")
    wire.thickness = 0.0032
    wire.use_replace = True
    wire.use_boundary = True
    cage.visible_shadow = False

    # --- internals: stay solid, revealed by the x-ray ------------------
    bm = bmesh.new()
    face_x = cx + S / 2
    fan_x = face_x - 0.12
    # shroud ring
    ring = bmesh.ops.create_cone(
        bm, cap_ends=False, segments=48, radius1=FAN_R + 0.012, radius2=FAN_R + 0.012, depth=0.24,
        matrix=Matrix.Translation((fan_x, cy, az)) @ Matrix.Rotation(math.pi / 2, 4, "Y"),
    )
    for v in ring["verts"]:
        for f in v.link_faces:
            f.smooth = True
            f.material_index = 0
    # motor and its three struts (none of them straight up: the camera passes there)
    C.bm_cyl(bm, 0.085, 0.26, (fan_x - 0.2, cy, az), "X", 1, segs=24)
    C.bm_cyl(bm, 0.022, 0.10, (fan_x - 0.03, cy, az), "X", 1, segs=12)
    for deg in (210, 330, 90 + 180):
        a = math.radians(deg)
        d = Vector((0, math.cos(a), math.sin(a)))
        mid = Vector((fan_x - 0.2, cy, az)) + d * ((FAN_R + 0.085) / 2)
        rot = Matrix.Rotation(a, 4, "X")
        C.bm_box(bm, (0.03, FAN_R - 0.085, 0.012), mid, rot, 1)
    # water in the tank, pump and the distribution pipe over the pads
    C.bm_box(bm, (S - 0.03, S - 0.03, 0.01), (cx, cy, z0 + tank_h * 0.72), None, 2)
    C.bm_cyl(bm, 0.05, 0.16, (cx - 0.25, cy + 0.38, z0 + 0.10), "Z", 1, segs=16)
    C.bm_cyl(bm, 0.012, open_h + 0.05, (cx - 0.25, cy + 0.38, z0 + tank_h + open_h / 2 - 0.05), "Z", 3, segs=10)
    top = z0 + tank_h + open_h - 0.035
    half = S / 2 - 0.115
    C.bm_cyl(bm, 0.012, S - 0.2, (cx - half, cy, top), "Y", 3, segs=10)
    for s in (1, -1):
        C.bm_cyl(bm, 0.012, S - 0.2, (cx, cy + s * half, top), "X", 3, segs=10)
    internals = C.finish("Cooler internals", bm, collection, (fan_blade, dark, water, pvc))

    fan = _fan(collection, fan_blade, dark)
    fan.location = (fan_x, cy, az)

    # --- stand ---------------------------------------------------------
    bm = bmesh.new()
    leg = 0.05
    for sx in (1, -1):
        for sy in (1, -1):
            C.bm_box(bm, (leg, leg, C.STAND_H), (cx + sx * (S / 2 - leg / 2), cy + sy * (S / 2 - leg / 2), C.TERRACE_Z + C.STAND_H / 2), None, 0)
            C.bm_box(bm, (0.14, 0.14, 0.012), (cx + sx * (S / 2 - leg / 2), cy + sy * (S / 2 - leg / 2), C.TERRACE_Z + 0.006), None, 0)
    for s in (1, -1):
        for zz in (C.TERRACE_Z + C.STAND_H - leg / 2, C.TERRACE_Z + 0.16):
            C.bm_box(bm, (S, leg, leg), (cx, cy + s * (S / 2 - leg / 2), zz), None, 0)
            C.bm_box(bm, (leg, S, leg), (cx + s * (S / 2 - leg / 2), cy, zz), None, 0)
    C.finish("Cooler stand", bm, collection, (steel,))

    # --- water feed along the terrace ---------------------------------
    bm = bmesh.new()
    py = cy + S / 2 + 0.12
    C.bm_cyl(bm, 0.016, 0.9, (cx + 0.3, py, C.TERRACE_Z + 0.45 + 0.06), "Z", 0, segs=10)
    C.bm_cyl(bm, 0.016, 7.0, (cx + 0.3 + 3.5, py, C.TERRACE_Z + 0.06), "X", 0, segs=10)
    C.bm_cyl(bm, 0.016, 0.14, (cx + 0.3, py - 0.06, C.TERRACE_Z + 0.9), "Y", 0, segs=10)
    C.finish("Water feed pipe", bm, collection, (pvc,))

    return {"shell": shell, "cage": cage, "internals": internals, "fan": fan, "fan_x": fan_x, "face_x": face_x}
