"""Roof terrace of a small Indian commercial building, plus the town around it."""

import math
import random

import bmesh
import bpy
from mathutils import Matrix, Vector

from . import common as C
from . import duct as D
from . import materials as M

EXHAUST_X = 8.35  # kitchen exhaust riser, shared with restaurant.py
EXHAUST_S = 0.5


def slab_holes():
    return [
        (C.DROP_X - C.DUCT_H / 2 - 0.04, C.DROP_X + C.DUCT_H / 2 + 0.04, -C.DUCT_W / 2 - 0.04, C.DUCT_W / 2 + 0.04),
        (EXHAUST_X - EXHAUST_S / 2 - 0.03, EXHAUST_X + EXHAUST_S / 2 + 0.03, -EXHAUST_S / 2 - 0.03, EXHAUST_S / 2 + 0.03),
    ]


def build(collection):
    X, Y, Z = Vector((1, 0, 0)), Vector((0, 1, 0)), Vector((0, 0, 1))
    concrete = M.tiles("Terrace tiles", (0.25, 0.20, 0.16), (0.31, 0.25, 0.20), grout=(0.12, 0.11, 0.10), size=0.3, rough=0.7)
    plaster = M.noisy("Parapet plaster", (0.50, 0.38, 0.24), (0.62, 0.49, 0.32), scale=0.9, rough=0.85, bump=0.35)
    coping = M.noisy("Coping", (0.26, 0.25, 0.23), (0.36, 0.34, 0.31), scale=3, rough=0.85, bump=0.4)
    tank = M.noisy("Water tank black", (0.012, 0.012, 0.014), (0.03, 0.03, 0.035), scale=8, rough=0.45, bump=0.15)
    brick = M.noisy("Brick plinth", (0.33, 0.13, 0.08), (0.48, 0.22, 0.13), scale=9, rough=0.9, bump=0.6)
    door = M.noisy("Door blue paint", (0.07, 0.20, 0.30), (0.10, 0.27, 0.38), scale=5, rough=0.6, bump=0.2)
    gi = M.galvanized()
    seam = M.duct_seam()
    flange_mat = M.galvanized("GI flange", tint=(0.56, 0.58, 0.60), spangle=140.0)
    ac = M.noisy("AC outdoor unit", (0.78, 0.78, 0.76), (0.86, 0.86, 0.84), scale=4, rough=0.5, bump=0.1)
    dark = M.simple("Motor dark", (0.03, 0.03, 0.035), rough=0.5, metallic=0.6)

    # --- slab (with the two duct penetrations) and parapet -------------
    bm = bmesh.new()
    D.plate(bm, (0, 0, C.ROOM_H), X, Y, Z, C.X0, C.X1, C.Y0, C.Y1, slab_holes(), C.SLAB_T, 0)
    C.finish("Roof slab", bm, collection, (concrete,))

    bm = bmesh.new()
    ph, pt = 1.0, C.WALL_T
    zc = C.TERRACE_Z + ph / 2
    for s in (1, -1):
        y = (C.Y1 if s > 0 else C.Y0) - s * pt / 2
        C.bm_box(bm, (C.X1 - C.X0, pt, ph), ((C.X0 + C.X1) / 2, y, zc), None, 0)
        C.bm_box(bm, (C.X1 - C.X0 + 0.08, pt + 0.08, 0.06), ((C.X0 + C.X1) / 2, y, C.TERRACE_Z + ph + 0.03), None, 1)
        x = (C.X1 if s > 0 else C.X0) - s * pt / 2
        C.bm_box(bm, (pt, C.Y1 - C.Y0 - 2 * pt, ph), (x, 0, zc), None, 0)
        C.bm_box(bm, (pt + 0.08, C.Y1 - C.Y0 + 0.08, 0.06), (x, 0, C.TERRACE_Z + ph + 0.03), None, 1)
    C.finish("Parapet", bm, collection, (plaster, coping), bevel=0.008)

    # --- stair head room ----------------------------------------------
    bm = bmesh.new()
    mx0, mx1, my0, my1, mh = 4.2, 7.2, 1.9, C.Y1 - pt, 2.6
    C.bm_box(bm, (mx1 - mx0, my1 - my0, mh), ((mx0 + mx1) / 2, (my0 + my1) / 2, C.TERRACE_Z + mh / 2), None, 0)
    C.bm_box(bm, (mx1 - mx0 + 0.5, my1 - my0 + 0.5, 0.14), ((mx0 + mx1) / 2, (my0 + my1) / 2 - 0.1, C.TERRACE_Z + mh + 0.07), None, 1)
    C.bm_box(bm, (0.05, 0.95, 2.05), (mx0 - 0.02, (my0 + my1) / 2, C.TERRACE_Z + 1.025), None, 2)
    C.finish("Stair head room", bm, collection, (plaster, coping, door), bevel=0.008)

    # --- overhead water tank on a brick plinth -------------------------
    bm = bmesh.new()
    tx, ty = 5.4, -3.3
    C.bm_box(bm, (1.6, 1.6, 0.5), (tx, ty, C.TERRACE_Z + 0.25), None, 1)
    tz = C.TERRACE_Z + 0.5
    C.bm_cyl(bm, 0.62, 1.15, (tx, ty, tz + 0.575), "Z", 0, segs=40)
    for i in range(5):
        C.bm_cyl(bm, 0.635, 0.035, (tx, ty, tz + 0.18 + i * 0.2), "Z", 0, segs=40)
    C.bm_cyl(bm, 0.62, 0.22, (tx, ty, tz + 1.26), "Z", 0, segs=40, radius2=0.26)
    C.bm_cyl(bm, 0.25, 0.07, (tx, ty, tz + 1.40), "Z", 0, segs=28)
    C.finish("Water tank", bm, collection, (tank, brick), bevel=0.006)

    # --- kitchen exhaust: riser, fan box and discharge cowl ------------
    bm = bmesh.new()
    ex, es = EXHAUST_X, EXHAUST_S
    top = C.TERRACE_Z + 1.25
    D.straight(bm, (ex, 0, C.TERRACE_Z - 0.05), (ex, 0, top), Y, -X, es, es, every=0.7)
    C.bm_box(bm, (0.72, 0.72, 0.62), (ex, 0, top + 0.31), None, 0)
    C.bm_cyl(bm, 0.12, 0.3, (ex, 0.5, top + 0.31), "Y", 3, segs=20)
    D.loft(bm, [(Vector((ex, 0, top + 0.62)), Y, -X, es, es), (Vector((ex, 0, top + 0.95)), Y, -X, es, es)], smooth=False)
    # gooseneck turning away from the dining side
    centre = Vector((ex + 0.5, 0, top + 0.95))
    frames = []
    for i in range(9):
        th = math.pi * 0.5 * i / 8
        o = centre + 0.5 * (-math.cos(th) * X + math.sin(th) * Z)
        Bv = -math.cos(th) * X + math.sin(th) * Z
        frames.append((o, Y, -Bv, es, es))
    D.loft(bm, frames)
    C.finish("Kitchen exhaust riser", bm, collection, (gi, seam, flange_mat, dark))

    # --- two split-AC outdoor units against the parapet ---------------
    bm = bmesh.new()
    for i, ax in enumerate((0.9, 2.0)):
        ay = C.Y1 - pt - 0.32
        C.bm_box(bm, (0.86, 0.32, 0.6), (ax, ay, C.TERRACE_Z + 0.12 + 0.3), None, 0)
        C.bm_cyl(bm, 0.22, 0.02, (ax - 0.1, ay - 0.165, C.TERRACE_Z + 0.42), "Y", 1, segs=28)
        for k in range(4):
            C.bm_cyl(bm, 0.06 + k * 0.05, 0.012, (ax - 0.1, ay - 0.172, C.TERRACE_Z + 0.42), "Y", 1, segs=28)
        for s in (1, -1):
            C.bm_box(bm, (0.05, 0.36, 0.12), (ax + s * 0.3, ay, C.TERRACE_Z + 0.06), None, 1)
    C.finish("AC outdoor units", bm, collection, (ac, dark), bevel=0.006)

    _town(collection)


def _town(collection):
    """Low flat-roofed neighbours so the horizon reads as a town, not a void."""
    rnd = random.Random(7)
    palette = [
        (0.56, 0.47, 0.33), (0.50, 0.36, 0.27), (0.60, 0.55, 0.46), (0.36, 0.45, 0.50),
        (0.58, 0.40, 0.33), (0.42, 0.50, 0.40), (0.62, 0.54, 0.34), (0.40, 0.38, 0.36),
    ]
    mats = [M.town_wall(f"Town wall {i}", col) for i, col in enumerate(palette)]
    tank = M.simple("Town tank", (0.02, 0.02, 0.022), rough=0.5)
    green = M.noisy("Tree canopy", (0.018, 0.045, 0.015), (0.05, 0.10, 0.03), scale=2.5, rough=0.9, bump=0.6)
    trunk = M.simple("Tree trunk", (0.10, 0.07, 0.05), rough=0.9)
    ground = M.noisy("Ground", (0.17, 0.14, 0.11), (0.25, 0.21, 0.16), scale=0.08, rough=0.95, bump=0.3)

    bm = bmesh.new()
    placed = []
    tries = 0
    while len(placed) < 150 and tries < 4000:
        tries += 1
        r = rnd.uniform(16, 150)
        a = rnd.uniform(0, 2 * math.pi)
        x, y = r * math.cos(a), r * math.sin(a) * 0.9
        w, d = rnd.uniform(6, 14), rnd.uniform(6, 13)
        if abs(x) < 15 + w / 2 and abs(y) < 9 + d / 2:
            continue
        # open plot on the approach side, where the camera starts
        if -34 - w / 2 < x < -9 + w / 2 and -26 - d / 2 < y < 4 + d / 2:
            continue
        if any(abs(x - px) < (w + pw) / 2 + 1.5 and abs(y - py) < (d + pd) / 2 + 1.5 for px, py, pw, pd in placed):
            continue
        placed.append((x, y, w, d))
        # nearby roofs stay below our terrace so the horizon is open
        floors = 1 if r < 42 else rnd.choice((1, 1, 2, 2, 2, 3)) if r < 90 else rnd.choice((1, 2, 2, 3, 3, 4))
        h = floors * 3.0 + (0.2 if floors == 1 else 0.4)
        mi = rnd.randrange(len(mats))
        C.bm_box(bm, (w, d, h), (x, y, h / 2), None, mi)
        # parapet lip and a stair head room
        C.bm_box(bm, (w + 0.1, d + 0.1, 0.9), (x, y, h + 0.45), None, mi)
        C.bm_box(bm, (w - 0.4, d - 0.4, 0.92), (x, y, h + 0.46), None, (mi + 3) % len(mats))
        if rnd.random() < 0.7:
            C.bm_box(bm, (2.6, 2.8, 2.5), (x + rnd.uniform(-w / 4, w / 4), y + rnd.uniform(-d / 4, d / 4), h + 1.25), None, mi)
        if rnd.random() < 0.8:
            C.bm_cyl(bm, 0.6, 1.3, (x + rnd.uniform(-w / 3, w / 3), y + rnd.uniform(-d / 3, d / 3), h + 1.6), "Z", len(mats), segs=14)
    town = C.finish("Town", bm, collection, (*mats, tank))

    bm = bmesh.new()
    for _ in range(70):
        r = rnd.uniform(14, 120)
        a = rnd.uniform(0, 2 * math.pi)
        x, y = r * math.cos(a), r * math.sin(a) * 0.9
        if abs(x) < 13 and abs(y) < 7:
            continue
        if -36 < x < -8 and -28 < y < 6:
            continue
        if any(abs(x - px) < pw / 2 + 1 and abs(y - py) < pd / 2 + 1 for px, py, pw, pd in placed):
            continue
        h = rnd.uniform(3.6, 6.2)
        C.bm_cyl(bm, 0.18, h * 0.6, (x, y, h * 0.3), "Z", 1, segs=8)
        for k in range(4):
            rr = rnd.uniform(1.1, 1.9)
            m = Matrix.Translation((x + rnd.uniform(-1.2, 1.2), y + rnd.uniform(-1.2, 1.2), h * 0.6 + rnd.uniform(0, 1.8))) @ Matrix.Diagonal((rr, rr, rr * 0.8, 1))
            res = bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.0, matrix=m)
            for v in res["verts"]:
                for f in v.link_faces:
                    f.material_index = 0
                    f.smooth = True
    C.finish("Trees", bm, collection, (green, trunk))

    bm = bmesh.new()
    C.bm_box(bm, (700, 700, 0.2), (0, 0, -0.1), None, 0)
    C.finish("Ground", bm, collection, (ground,))
    return town
