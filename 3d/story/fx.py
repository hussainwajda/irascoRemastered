"""Airflow lines. Amber is hot or stale air, blue is cooled air. The geometry is
static; a dash pattern slides along each line in the shader, driven by frame."""

import math
import random

import bmesh
import bpy
from mathutils import Vector

from . import common as C
from . import materials as M
from . import restaurant as R
from . import terrace as T

TIME_NODE = "TIME"


def catmull(points, sub=6):
    pts = [Vector(p) for p in points]
    res, n = [], len(pts)
    for i in range(n - 1):
        p0, p1, p2, p3 = pts[max(i - 1, 0)], pts[i], pts[i + 1], pts[min(i + 2, n - 1)]
        for k in range(sub):
            t = k / sub
            res.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t ** 3))
    res.append(pts[-1])
    return res


def tube(bm, pts, width, uv, col, phase, heat_fn):
    rings, u, prev = [], 0.0, None
    last = len(pts) - 1
    for i, p in enumerate(pts):
        t = (pts[min(i + 1, last)] - pts[max(i - 1, 0)]).normalized()
        ref = Vector((0, 0, 1)) if abs(t.z) < 0.9 else Vector((1, 0, 0))
        a = t.cross(ref).normalized()
        b = t.cross(a).normalized()
        if prev is not None:
            u += (p - prev).length
        prev = p
        f = i / last
        fade = min(1.0, f / 0.08, (1 - f) / 0.12)
        ring = [bm.verts.new(p + (a * sa + b * sb) * (width / 2)) for sa, sb in ((1, 1), (-1, 1), (-1, -1), (1, -1))]
        rings.append((ring, u, heat_fn(f), max(0.0, fade)))
    for i in range(len(rings) - 1):
        (r0, u0, h0, f0), (r1, u1, h1, f1) = rings[i], rings[i + 1]
        for k in range(4):
            face = bm.faces.new((r0[k], r0[(k + 1) % 4], r1[(k + 1) % 4], r1[k]))
            for j, loop in enumerate(face.loops):
                first = j < 2
                loop[uv].uv = ((u0 if first else u1), phase)
                loop[col] = ((h0 if first else h1), (f0 if first else f1), 0.0, 1.0)


def air_material():
    m = bpy.data.materials.new("Airflow")
    try:
        m.use_nodes = True
    except Exception:
        pass
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    uvn = nt.nodes.new("ShaderNodeUVMap")
    uvn.uv_map = "flow"
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(uvn.outputs["UV"], sep.inputs["Vector"])
    att = nt.nodes.new("ShaderNodeAttribute")
    att.attribute_name = "air"
    sepc = nt.nodes.new("ShaderNodeSeparateColor")
    nt.links.new(att.outputs["Color"], sepc.inputs["Color"])

    time = nt.nodes.new("ShaderNodeValue")
    time.name = time.label = TIME_NODE
    fc = time.outputs[0].driver_add("default_value")
    fc.driver.type = "SCRIPTED"
    fc.driver.expression = "frame / 30"

    def math_node(op, a=None, b=None, va=0.0, vb=0.0):
        n = nt.nodes.new("ShaderNodeMath")
        n.operation = op
        n.inputs[0].default_value = va
        n.inputs[1].default_value = vb
        if a is not None:
            nt.links.new(a, n.inputs[0])
        if b is not None:
            nt.links.new(b, n.inputs[1])
        return n.outputs["Value"]

    u = math_node("MULTIPLY", sep.outputs["X"], vb=0.5)
    ph = math_node("MULTIPLY", sep.outputs["Y"], vb=17.3)
    tt = math_node("MULTIPLY", time.outputs[0], vb=1.5)
    s = math_node("SUBTRACT", math_node("ADD", u, ph), tt)
    fr = math_node("FRACT", s)
    head = math_node("POWER", fr, vb=5.0)
    mask = math_node("MULTIPLY", head, sepc.outputs["Green"])
    strength = math_node("MULTIPLY", mask, vb=3.2)

    mix = nt.nodes.new("ShaderNodeMix")
    mix.data_type = "RGBA"
    mix.inputs["A"].default_value = (0.10, 0.45, 1.0, 1)
    mix.inputs["B"].default_value = (1.0, 0.36, 0.05, 1)
    nt.links.new(sepc.outputs["Red"], mix.inputs["Factor"])
    em = nt.nodes.new("ShaderNodeEmission")
    nt.links.new(mix.outputs["Result"], em.inputs["Color"])
    nt.links.new(strength, em.inputs["Strength"])
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    add = nt.nodes.new("ShaderNodeAddShader")
    nt.links.new(tr.outputs["BSDF"], add.inputs[0])
    nt.links.new(em.outputs["Emission"], add.inputs[1])
    nt.links.new(add.outputs["Shader"], out.inputs["Surface"])
    try:
        m.surface_render_method = "BLENDED"
    except Exception:
        pass
    return m


def supply_lines(rnd, per_face=9):
    """Outside air -> pad -> fan -> duct -> elbow -> drop -> room.

    Lines keep their order through the cooler (outer stays outer) so they read
    as laminar flow instead of a tangle."""
    cx, S, az = C.COOLER_X, C.COOLER_S, C.AXIS_Z
    fan_x = cx + S / 2 - 0.12
    Z = Vector((0, 0, 1))
    grille_xs = [0.5, 1.7, 2.9, 4.0]
    lines = []
    for face in ("front", "left", "right"):
        for i in range(per_face):
            # stratified position on the pad
            col, row = i % 3, i // 3
            pu = (col - 1) * 0.34 + rnd.uniform(-0.09, 0.09)
            pz = (row - 1) * 0.30 + rnd.uniform(-0.08, 0.08)
            far = rnd.uniform(0.9, 1.7)
            if face == "front":
                fc, N, U = Vector((cx - S / 2, 0, az)), Vector((-1, 0, 0)), Vector((0, 1, 0))
                ry, rz = pu * 0.62, pz * 0.62
                turn = Vector((cx + 0.05, pu * 0.8, az + pz * 0.8))
            else:
                s = -1 if face == "left" else 1
                fc, N, U = Vector((cx, s * S / 2, az)), Vector((0, s, 0)), Vector((1, 0, 0))
                ry = s * C.lerp(0.30, 0.13, pu + 0.5)
                rz = pz * 0.62
                turn = Vector((cx + pu * 0.45 + 0.12, s * (S / 2 - 0.36), az + pz * 0.8))
            rr = math.hypot(ry, rz)
            if rr < 0.15:  # keep clear of the hub
                k = 0.15 / max(rr, 1e-3)
                ry, rz = ry * k, rz * k
            start = fc + N * far + U * pu * 1.25 + Z * pz * 1.2
            at_pad = fc + U * pu + Z * pz
            pts = [start, fc + N * 0.35 + U * pu * 1.05 + Z * pz * 1.05, at_pad, turn,
                   Vector((fan_x - 0.25, ry * 1.05, az + rz * 1.05)), Vector((fan_x + 0.12, ry, az + rz))]
            # along the terrace run, keeping this line's place in the cross-section
            # and staying off the camera's centre line
            dy, dz = ry / 0.31 * 0.33, rz / 0.31 * 0.23
            if math.hypot(dy, dz) < 0.17:
                k = 0.17 / max(math.hypot(dy, dz), 1e-3)
                dy, dz = dy * k, dz * k
            x = fan_x + 0.95
            x_end = C.DROP_X - C.ELBOW_R
            while x < x_end:
                pts.append(Vector((x, dy, az + dz)))
                x += 0.9
            centre = Vector((x_end, 0, az - C.ELBOW_R))
            for k in range(1, 5):
                th = (math.pi / 2) * k / 4
                rad = C.ELBOW_R + dz
                pts.append(centre + Vector((rad * math.sin(th), dy, rad * math.cos(th))))
            dxr = dz
            bottom = C.PLENUM_Z - 0.35
            if (i + (0 if face == "front" else 1)) % 2 == 0:
                # straight down through the damper, fanning out over the table
                pts.append(Vector((C.DROP_X + dxr, dy, C.PLENUM_Z + 0.2)))
                pts.append(Vector((C.DROP_X + dxr * 0.9, dy * 0.9, bottom - 0.15)))
                ang = math.atan2(dy, dxr) + rnd.uniform(-0.3, 0.3)
                reach = rnd.uniform(1.3, 2.3)
                pts.append(Vector((C.DROP_X + math.cos(ang) * reach * 0.4, math.sin(ang) * reach * 0.4, 2.0)))
                pts.append(Vector((C.DROP_X + math.cos(ang) * reach, math.sin(ang) * reach, rnd.uniform(1.0, 1.35))))
            else:
                # into the trunk and out of a side grille
                side = 1 if dy >= 0 else -1
                gx = grille_xs[(i + row) % len(grille_xs)] + rnd.uniform(-0.2, 0.2)
                gz = C.PLENUM_Z + rnd.uniform(-0.08, 0.08)
                pts.append(Vector((C.DROP_X + 0.05, dy * 0.6, C.PLENUM_Z + 0.12)))
                pts.append(Vector((C.DROP_X + 0.75, dy * 0.6, gz)))
                pts.append(Vector((gx - 0.4, side * 0.14, gz)))
                pts.append(Vector((gx, side * (C.TRUNK_W / 2 + 0.06), gz)))
                reach = rnd.uniform(1.5, 2.7)
                pts.append(Vector((gx + 0.15, side * (C.TRUNK_W / 2 + reach * 0.55), gz - 0.22)))
                pts.append(Vector((gx + 0.3, side * (C.TRUNK_W / 2 + reach), rnd.uniform(1.15, 1.8))))
            cut = 2.6 / (len(pts) - 1)
            lines.append((pts, lambda f, cut=cut: 1.0 - C.smoothstep(cut - 0.03, cut + 0.04, f)))
    return lines


def exhaust_lines(rnd, count=14):
    """Cooking heat and fumes rising into the hood and out through the roof."""
    xi1 = C.X1 - C.WALL_T
    rxc = xi1 - 0.41 - 0.05
    lines = []
    for i in range(count):
        by = rnd.choice((-1.65, -0.55, 0.55, 1.65)) + rnd.uniform(-0.18, 0.18)
        x0 = rxc + rnd.uniform(-0.15, 0.15)
        pts = [
            Vector((x0, by, 1.15)),
            Vector((x0 + rnd.uniform(-0.08, 0.08), by + rnd.uniform(-0.1, 0.1), 1.6)),
            Vector((x0 + rnd.uniform(-0.05, 0.1), by * 0.9, 2.05)),
            Vector((T.EXHAUST_X + rnd.uniform(-0.1, 0.1), by * 0.35, 2.45)),
            Vector((T.EXHAUST_X + rnd.uniform(-0.15, 0.15), rnd.uniform(-0.15, 0.15), 2.9)),
            Vector((T.EXHAUST_X + rnd.uniform(-0.15, 0.15), rnd.uniform(-0.15, 0.15), 4.2)),
            Vector((T.EXHAUST_X + rnd.uniform(-0.12, 0.12), rnd.uniform(-0.15, 0.15), C.TERRACE_Z + 1.9)),
            Vector((T.EXHAUST_X + 0.45, rnd.uniform(-0.15, 0.15), C.TERRACE_Z + 2.55 + rnd.uniform(-0.1, 0.1))),
            Vector((T.EXHAUST_X + 1.4, rnd.uniform(-0.5, 0.5), C.TERRACE_Z + 2.9 + rnd.uniform(-0.2, 0.5))),
        ]
        lines.append((pts, lambda f: 1.0))
    return lines


def build(collection, out=None):
    rnd = random.Random(11)
    mat = air_material()
    bm = bmesh.new()
    uv = bm.loops.layers.uv.new("flow")
    col = bm.loops.layers.float_color.new("air")
    for pts, heat in supply_lines(rnd) + exhaust_lines(rnd):
        tube(bm, catmull(pts, sub=8), rnd.uniform(0.003, 0.005), uv, col, rnd.random(), heat)
    ob = C.finish("Airflow lines", bm, collection, (mat,))
    ob.visible_shadow = False
    return {"lines": ob}
