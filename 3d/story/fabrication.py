"""Workshop film: one duct section, from flat sheet to insulated piece.

Six beats of FRAMES_PER_STEP frames each, in the real fabrication order used
on the site (app/components/FabricationFilm.tsx): sheet, cut, fold, seam,
flange, insulate.

    blender -b -P 3d/story/fabrication.py -- --out 3d/renders/fabrication [--save 3d/irasco-fabrication.blend]
"""

import math
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import bmesh  # noqa: E402
import bpy  # noqa: E402
from mathutils import Vector  # noqa: E402

from story import common as C  # noqa: E402
from story import materials as M  # noqa: E402

FRAMES_PER_STEP = 20
FRAMES = FRAMES_PER_STEP * 6
SIZE = (800, 600)

W, H, L = 0.6, 0.4, 1.2  # finished duct: width, height, length
T = 0.004  # sheet thickness, exaggerated a little so edges read
OX = W / 2  # shifts the parts so the finished section is centred on the root
TINY = (0.0001, 0.0001, 0.0001)
BG = (0.0052, 0.0070, 0.0091)  # #101418, the site's graphite


def key(ob, path, frame, value, index=-1):
    if index >= 0:
        cur = list(getattr(ob, path))
        cur[index] = value
        setattr(ob, path, cur)
        ob.keyframe_insert(path, index=index, frame=frame)
    else:
        setattr(ob, path, value)
        ob.keyframe_insert(path, frame=frame)


def sheet_panel(name, x0, x1, coll, mat, parent, at):
    """A panel whose origin is its hinge line (local x = 0)."""
    bm = bmesh.new()
    C.bm_box(bm, (x1 - x0, L, T), ((x0 + x1) / 2, 0, T / 2), None, 0)
    ob = C.finish(name, bm, coll, (mat,), bevel=0.0008)
    ob.parent = parent
    ob.location = at
    return ob


def build():
    C.reset_scene()
    M.reset_cache()
    scene = bpy.context.scene
    coll = C.coll("Fabrication")

    gi = M.galvanized("GI sheet", tint=(0.70, 0.73, 0.76), spangle=55.0)
    angle = M.galvanized("GI flange", tint=(0.50, 0.52, 0.55), spangle=140.0)
    foil = M.noisy("Foil insulation", (0.80, 0.82, 0.84), (0.95, 0.96, 0.97), scale=7, rough=0.20, bump=0.35, metallic=1.0, detail=3.0)
    floor = M.simple("Studio floor", (0.0016, 0.0019, 0.0024), rough=0.8, spec=0.04)
    spark = M.emissive("Cut spark", (1.0, 0.72, 0.25), 60.0)
    seam = M.simple("Seam glow", (0.02, 0.02, 0.02), rough=0.5, ecolor=(0.30, 0.60, 1.0), estrength=0.0)

    root = bpy.data.objects.new("Duct", None)
    coll.objects.link(root)

    # --- the four panels, hinged: side | bottom | side | top -----------
    bottom = sheet_panel("Bottom", 0, W, coll, gi, root, (-W + OX, 0, 0))
    side_a = sheet_panel("Side A", -H, 0, coll, gi, bottom, (0, 0, 0))
    side_b = sheet_panel("Side B", 0, H, coll, gi, bottom, (W, 0, 0))
    top = sheet_panel("Top", 0, W, coll, gi, side_b, (H, 0, 0))

    # --- offcuts trimmed away in the cut step ---------------------------
    def offcut(name, size, loc):
        bm = bmesh.new()
        C.bm_box(bm, size, (0, 0, T / 2), None, 0)
        ob = C.finish(name, bm, coll, (gi,), bevel=0.0008)
        ob.parent = root
        ob.location = loc
        return ob

    cut_gap = 0.012
    x_min, x_max = -W - H + OX, H + W + OX  # the flat sheet in root space
    long_cut = offcut("Offcut long", (x_max - x_min + 0.14, 0.09, T), ((x_min + x_max) / 2 + 0.07, L / 2 + cut_gap + 0.045, 0))
    short_cut = offcut("Offcut short", (0.11, L, T), (x_max + cut_gap + 0.055, 0, 0))

    # --- travelling cut point -------------------------------------------
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=2, radius=0.016)
    cutter = C.finish("Cut point", bm, coll, (spark,))
    cutter.parent = root
    glow = bpy.data.lights.new("Cut glow", "POINT")
    glow.color = (1.0, 0.70, 0.30)
    glow.shadow_soft_size = 0.03
    glow_ob = bpy.data.objects.new("Cut glow", glow)
    glow_ob.parent = cutter
    glow_ob.location = (0, 0, 0.05)
    coll.objects.link(glow_ob)

    # --- seam line along the closing edge -------------------------------
    bm = bmesh.new()
    C.bm_box(bm, (0.012, L, 0.012), (0, 0, 0), None, 0)
    seam_ob = C.finish("Seam", bm, coll, (seam,))
    seam_ob.parent = root
    seam_ob.location = (-W + OX, 0, H + T / 2)

    # --- flanges ----------------------------------------------------------
    def flange(name, y):
        bm = bmesh.new()
        p = 0.035
        cx, cz = -W / 2 + OX, H / 2
        for s in (1, -1):
            C.bm_box(bm, (W + 2 * p, 0.03, p), (cx, 0, cz + s * (H / 2 + p / 2)), None, 0)
            C.bm_box(bm, (p, 0.03, H), (cx + s * (W / 2 + p / 2), 0, cz), None, 0)
        ob = C.finish(name, bm, coll, (angle,), bevel=0.002)
        ob.parent = root
        ob.location = (0, y, 0)
        return ob

    flange_a = flange("Flange A", -L / 2)
    flange_b = flange("Flange B", L / 2)

    # --- foil wrap --------------------------------------------------------
    bm = bmesh.new()
    off = 0.045
    cx, cz = -W / 2 + OX, H / 2
    wrap_l = L - 0.16
    for s in (1, -1):
        C.bm_box(bm, (W + 2 * off, wrap_l, 0.006), (cx, 0, cz + s * (H / 2 + off)), None, 0)
        C.bm_box(bm, (0.006, wrap_l, H + 2 * off), (cx + s * (W / 2 + off), 0, cz), None, 0)
    wrap = C.finish("Foil wrap", bm, coll, (foil,), bevel=0.004)
    wrap.parent = root

    # --- studio -----------------------------------------------------------
    bm = bmesh.new()
    C.bm_box(bm, (40, 40, 0.02), (0, 0, -0.011), None, 0)
    C.finish("Floor", bm, coll, (floor,))

    world = scene.world or bpy.data.worlds.new("World")
    scene.world = world
    try:
        world.use_nodes = True
    except Exception:
        pass
    bgn = next(n for n in world.node_tree.nodes if n.type == "BACKGROUND")
    bgn.inputs["Color"].default_value = (*BG, 1)
    bgn.inputs["Strength"].default_value = 1.0

    def light(name, kind, energy, color, loc, aim, **props):
        data = bpy.data.lights.new(name, kind)
        data.energy = energy
        data.color = color
        for k, v in props.items():
            try:
                setattr(data, k, v)
            except Exception:
                pass
        ob = bpy.data.objects.new(name, data)
        ob.location = loc
        ob.rotation_euler = (Vector(aim) - Vector(loc)).normalized().to_track_quat("-Z", "Y").to_euler()
        coll.objects.link(ob)
        return ob

    light("Key", "AREA", 400, (1.0, 0.95, 0.88), (-1.6, -2.2, 3.0), (0, 0, 0.2), shape="RECTANGLE", size=2.4, size_y=1.6)
    light("Rim", "AREA", 260, (0.50, 0.72, 1.0), (2.4, 2.6, 1.6), (0, 0, 0.3), shape="RECTANGLE", size=2.0, size_y=1.0)
    light("Top", "AREA", 420, (0.92, 0.96, 1.0), (0.2, 0.3, 4.2), (0, 0, 0), shape="SQUARE", size=6.0)
    light("Fill", "AREA", 90, (0.85, 0.90, 1.0), (2.6, -2.4, 1.2), (0, 0, 0.2), shape="RECTANGLE", size=2.0, size_y=2.0)

    # ======================= animation ===================================
    S = FRAMES_PER_STEP
    scene.frame_start, scene.frame_end = 0, FRAMES - 1

    # 1 sheet: slides in and settles
    key(root, "location", 0, (-2.9, 0, 0))
    key(root, "location", S - 5, (-OX, 0, 0))

    # 2 cut: the point runs the long edge, then the short edge; offcuts drop away
    y_cut = L / 2 + cut_gap / 2
    x_cut = x_max + cut_gap / 2
    glow.energy = 0.0
    glow.keyframe_insert("energy", frame=S - 1)
    key(cutter, "scale", S - 1, (0.001, 0.001, 0.001))
    key(cutter, "scale", S, (1, 1, 1))
    key(cutter, "location", S, (x_min, y_cut, T))
    key(cutter, "location", S + 9, (x_cut, y_cut, T))
    key(cutter, "location", S + 15, (x_cut, -L / 2, T))
    key(cutter, "scale", S + 15, (1, 1, 1))
    key(cutter, "scale", S + 16, (0.001, 0.001, 0.001))
    glow.energy = 14.0
    glow.keyframe_insert("energy", frame=S)
    glow.keyframe_insert("energy", frame=S + 15)
    glow.energy = 0.0
    glow.keyframe_insert("energy", frame=S + 16)

    key(long_cut, "location", S + 9, tuple(long_cut.location))
    key(long_cut, "location", 2 * S - 1, (long_cut.location.x, long_cut.location.y + 1.2, 0))
    key(long_cut, "scale", 2 * S - 8, (1, 1, 1))
    key(long_cut, "scale", 2 * S - 1, TINY)
    key(short_cut, "location", S + 15, tuple(short_cut.location))
    key(short_cut, "location", 2 * S - 1, (short_cut.location.x + 0.7, 0, 0))
    key(short_cut, "scale", 2 * S - 4, (1, 1, 1))
    key(short_cut, "scale", 2 * S - 1, TINY)

    # 3 fold: sides up, then the top over
    f = 2 * S
    for ob, a, start, end in ((side_a, math.pi / 2, f, f + 12), (side_b, -math.pi / 2, f + 3, f + 15), (top, -math.pi / 2, f + 10, f + S + 3)):
        key(ob, "rotation_euler", start, 0.0, index=1)
        key(ob, "rotation_euler", end, a, index=1)
    # bring the finished section to the middle of the frame as it closes
    key(root, "location", f, (-OX, 0, 0))
    key(root, "location", f + S, (0, 0, 0))

    # 4 seam: a line of light runs the lock, the piece lifts and turns
    f = 3 * S
    bsdf = next(n for n in seam.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    strength = bsdf.inputs["Emission Strength"]
    for frame, val in ((f + 2, 0.0), (f + 7, 26.0), (f + 13, 26.0), (f + S - 1, 0.0)):
        strength.default_value = val
        strength.keyframe_insert("default_value", frame=frame)
    key(seam_ob, "scale", 0, TINY)
    key(seam_ob, "scale", f, TINY)
    key(seam_ob, "scale", f + 1, (1, 0.001, 1))
    key(seam_ob, "scale", f + 8, (1, 1, 1))
    key(root, "location", f + 4, (0, 0, 0))
    key(root, "location", f + S + 4, (0, 0, 0.32))
    key(root, "rotation_euler", f + 4, 0.0, index=2)
    key(root, "rotation_euler", 5 * S, math.radians(34), index=2)

    # 5 flange: frames slide on from both ends
    f = 4 * S
    for ob, y, delay in ((flange_a, -L / 2, 0), (flange_b, L / 2, 3)):
        sign = 1 if y > 0 else -1
        key(ob, "location", f + delay, (0, y + sign * 1.3, 0))
        key(ob, "location", f + delay + 13, (0, y, 0))
        key(ob, "scale", 0, TINY)
        key(ob, "scale", f + delay - 1, TINY)
        key(ob, "scale", f + delay + 2, (1, 1, 1))

    # 6 insulate: foil runs along the length
    f = 5 * S
    key(wrap, "scale", 0, TINY)
    key(wrap, "scale", f - 1, TINY)
    key(wrap, "scale", f, (1, 0.0001, 1))
    key(wrap, "scale", f + 15, (1, 1, 1))

    # camera: a slow quarter-orbit that tightens as the piece comes together
    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = 50
    cam = bpy.data.objects.new("Camera", cam_data)
    coll.objects.link(cam)
    scene.camera = cam
    for frame in range(FRAMES):
        t = frame / (FRAMES - 1)
        e = C.smoothstep(0.0, 1.0, t)
        az = math.radians(C.lerp(-64, -38, e))
        dist = C.lerp(4.3, 3.3, C.smoothstep(0.3, 0.75, t))
        height = C.lerp(2.9, 1.75, C.smoothstep(0.3, 0.8, t))
        target = Vector((0.0, 0.0, C.lerp(0.0, 0.5, C.smoothstep(0.5, 0.85, t))))
        pos = Vector((dist * math.cos(az), dist * math.sin(az), height))
        cam.location = pos
        cam.rotation_euler = (target - pos).normalized().to_track_quat("-Z", "Y").to_euler()
        cam.keyframe_insert("location", frame=frame)
        cam.keyframe_insert("rotation_euler", frame=frame)

    # render settings
    r = scene.render
    r.resolution_x, r.resolution_y = SIZE
    r.resolution_percentage = 100
    ee = scene.eevee
    for attr, val in (("taa_render_samples", 48), ("use_raytracing", True), ("use_shadows", True), ("use_fast_gi", True)):
        try:
            setattr(ee, attr, val)
        except Exception:
            pass
    try:
        scene.view_settings.view_transform = "Standard"
    except Exception:
        pass
    scene.frame_set(0)


if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []

    def arg(name, default=None):
        return argv[argv.index(name) + 1] if name in argv else default

    build()
    scene = bpy.context.scene
    if "--save" in argv:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(arg("--save")))
    out = arg("--out")
    if out:
        out = os.path.abspath(out)
        os.makedirs(out, exist_ok=True)
        scene.frame_start = int(arg("--start", 0))
        scene.frame_end = int(arg("--end", FRAMES - 1))
        scene.frame_step = int(arg("--step", 1))
        scene.render.filepath = os.path.join(out, "f_")
        scene.render.image_settings.file_format = "PNG"
        scene.render.image_settings.color_mode = "RGB"
        bpy.ops.render.render(animation=True)
        print("RENDER_DONE", out)
