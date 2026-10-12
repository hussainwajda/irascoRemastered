"""Camera path and every keyframed value in the film.

The film is scrubbed by scroll on the website, so nothing here relies on
real-time speed. FRAMES and CHAPTERS are mirrored in the web component
(app/components/story/chapters.ts): change them together.
"""

import math

import bpy
from mathutils import Matrix, Quaternion, Vector

from . import common as C
from . import cooler as K
from . import lighting as L
from . import materials as M

FRAMES = 300  # 0..299

# frame numbers of the story beats
F_XRAY_ON = (64, 86)
F_HOLD = (86, 120)
F_PAD = 138
F_FAN = 145
F_ELBOW = 194
F_DROP = 206
F_DAMPER = 229
F_DAMPER_OPEN = (207, 224)
F_XRAY_OFF = (147, 158)

CHAPTERS = [
    {"id": "terrace", "frames": (0, 62)},
    {"id": "cooler", "frames": (62, 132)},
    {"id": "duct", "frames": (132, 226)},
    {"id": "room", "frames": (226, 299)},
]

FAN_STEP = math.radians(6.0)  # per frame: slow, so scrubbing never strobes
UP_OUT = Vector((0, 0, 1))
UP_IN = Vector((1, 0, 1)).normalized()  # stays valid looking along +X and straight down


def duct_point(s):
    """Centre line from the fan plane (s=0) to below the damper. Returns the point."""
    az = C.AXIS_Z
    fan_x = C.COOLER_X + C.COOLER_S / 2 - 0.12
    x_el = C.DROP_X - C.ELBOW_R
    la = x_el - fan_x
    lb = math.pi / 2 * C.ELBOW_R
    if s <= la:
        return Vector((fan_x + s, 0, az))
    if s <= la + lb:
        th = (s - la) / C.ELBOW_R
        return Vector((x_el + C.ELBOW_R * math.sin(th), 0, az - C.ELBOW_R + C.ELBOW_R * math.cos(th)))
    return Vector((C.DROP_X, 0, az - C.ELBOW_R - (s - la - lb)))


def duct_lengths():
    fan_x = C.COOLER_X + C.COOLER_S / 2 - 0.12
    la = (C.DROP_X - C.ELBOW_R) - fan_x
    lb = math.pi / 2 * C.ELBOW_R
    return la, lb


def keys():
    """(frame, position, target, lens, up_hint) control points."""
    az = C.AXIS_Z
    cc = Vector((C.COOLER_X, 0, az))
    pad_x = C.COOLER_X - C.COOLER_S / 2
    ks = [
        (0, (-19.6, -9.6, 9.6), (-7.6, 0.4, 4.9), 32, UP_OUT),
        (34, (-17.5, -7.7, 8.5), (-8.2, 0.3, 5.0), 32, UP_OUT),
        (62, (-15.4, -5.6, 7.3), (-8.8, 0.1, 5.2), 33, UP_OUT),
        (86, (-13.0, -2.7, 6.25), cc + Vector((0.25, 0, 0.0)), 35, UP_OUT),
        (120, (-12.3, -1.5, 5.95), cc + Vector((0.25, 0, 0.0)), 35, UP_OUT),
        (131, (-11.2, -0.45, 5.72), (-8.0, 0, az + 0.18), 28, UP_OUT),
        (F_PAD, (pad_x - 0.02, 0.0, az + 0.20), (-7.0, 0, az + 0.22), 22, UP_IN),
    ]
    la, lb = duct_lengths()
    lift = 0.24  # pass above the motor, between two blades
    # distance along the duct for a set of frames
    stations = [
        (F_FAN, 0.0),
        (F_FAN + 6, 0.75),
        (F_ELBOW, la),
        (F_DROP, la + lb),
        (F_DAMPER, la + lb + (az - C.ELBOW_R) - (C.PLENUM_Z - 0.385)),
    ]

    def s_at(f):
        for (f0, s0), (f1, s1) in zip(stations, stations[1:]):
            if f0 <= f <= f1:
                return C.lerp(s0, s1, (f - f0) / (f1 - f0))
        return stations[-1][1]

    f = F_FAN
    while f < F_DAMPER:
        s = s_at(f)
        p = duct_point(s)
        p.z += lift * (1 - C.smoothstep(0.0, 1.6, s)) if s < la else 0.0
        look = duct_point(s + 1.0)
        if s < 1.2:
            look.z += lift * 0.5
        ks.append((f, tuple(p), tuple(look), 18, UP_IN))
        f += 3
    damper_z = C.PLENUM_Z - 0.385
    ks += [
        (F_DAMPER, (C.DROP_X, 0, damper_z), (C.DROP_X, 0, 0.77), 18, UP_IN),
        (F_DAMPER + 9, (C.DROP_X - 0.02, 0, 2.40), (C.DROP_X + 0.05, 0, 0.77), 18, UP_IN),
        (F_DAMPER + 24, (C.DROP_X - 0.75, 0, 2.08), (C.DROP_X + 1.3, 0, 0.9), 18, UP_IN),
        (F_DAMPER + 44, (-3.3, -0.95, 1.84), (3.6, 0.35, 1.95), 19, UP_OUT),
        (FRAMES - 1, (-5.0, -1.75, 1.66), (5.6, 0.6, 2.35), 20, UP_OUT),
    ]
    return [(f, Vector(p), Vector(t), lens, Vector(u)) for (f, p, t, lens, u) in ks]


def _hermite(ks, idx, f):
    """Cubic Hermite through unevenly spaced keys, on any Vector channel."""
    (f0, a), (f1, b) = ks[idx], ks[idx + 1]
    fp, ap = ks[max(idx - 1, 0)]
    fn, bn = ks[min(idx + 2, len(ks) - 1)]
    m0 = (b - ap) / (f1 - fp) if f1 != fp else (b - a) / (f1 - f0)
    m1 = (bn - a) / (fn - f0) if fn != f0 else (b - a) / (f1 - f0)
    dt = f1 - f0
    t = (f - f0) / dt
    h00 = 2 * t ** 3 - 3 * t ** 2 + 1
    h10 = t ** 3 - 2 * t ** 2 + t
    h01 = -2 * t ** 3 + 3 * t ** 2
    h11 = t ** 3 - t ** 2
    return a * h00 + m0 * (h10 * dt) + b * h01 + m1 * (h11 * dt)


def sample(f, ks=None):
    ks = ks or keys()
    idx = 0
    for i in range(len(ks) - 1):
        if ks[i][0] <= f <= ks[i + 1][0]:
            idx = i
            break
    pos = _hermite([(k[0], k[1]) for k in ks], idx, f)
    tgt = _hermite([(k[0], k[2]) for k in ks], idx, f)
    t = (f - ks[idx][0]) / (ks[idx + 1][0] - ks[idx][0])
    lens = C.lerp(ks[idx][3], ks[idx + 1][3], C.smoothstep(0, 1, t))
    up = ks[idx][4].lerp(ks[idx + 1][4], t).normalized()
    fwd = (tgt - pos).normalized()
    right = fwd.cross(up).normalized()
    true_up = right.cross(fwd).normalized()
    rot = Matrix((right, true_up, -fwd)).transposed()
    return pos, rot.to_quaternion(), lens


def _key_value(node, pairs):
    sock = node.outputs[0]
    for frame, value in pairs:
        sock.default_value = value
        sock.keyframe_insert("default_value", frame=frame)


def build(collection, out=None):
    out = out or {}
    scene = bpy.context.scene
    scene.frame_start, scene.frame_end = 0, FRAMES - 1

    cam_data = bpy.data.cameras.new("Story camera")
    cam_data.sensor_width = 36
    cam_data.clip_start = 0.02
    cam_data.clip_end = 600
    cam = bpy.data.objects.new("Story camera", cam_data)
    cam.rotation_mode = "QUATERNION"
    collection.objects.link(cam)
    scene.camera = cam

    ks = keys()
    prev_q = None
    for f in range(FRAMES):
        pos, q, lens = sample(f, ks)
        if prev_q is not None and prev_q.dot(q) < 0:
            q.negate()
        prev_q = q.copy()
        cam.location = pos
        cam.rotation_quaternion = q
        cam_data.lens = lens
        cam.keyframe_insert("location", frame=f)
        cam.keyframe_insert("rotation_quaternion", frame=f)
        cam_data.keyframe_insert("lens", frame=f)

    # headlamp: the only light inside the duct besides the air lines
    lamp_data = bpy.data.lights.new("Duct headlamp", "POINT")
    lamp_data.color = (0.72, 0.86, 1.0)
    lamp_data.shadow_soft_size = 0.25
    lamp = bpy.data.objects.new("Duct headlamp", lamp_data)
    lamp.parent = cam
    lamp.location = (0, 0.05, 0.35)
    collection.objects.link(lamp)
    for frame, w in ((F_PAD - 6, 0.0), (F_FAN, 26.0), (F_DROP + 2, 26.0), (F_DAMPER_OPEN[1], 5.0), (F_DAMPER + 2, 0.0)):
        lamp_data.energy = w
        lamp_data.keyframe_insert("energy", frame=frame)

    # warm room light pushing up through the damper as it opens
    glow_data = bpy.data.lights.new("Damper glow", "AREA")
    glow_data.shape = "SQUARE"
    glow_data.size = 0.9
    glow_data.color = (1.0, 0.78, 0.50)
    glow = bpy.data.objects.new("Damper glow", glow_data)
    glow.location = (C.DROP_X, 0, C.PLENUM_Z - 1.0)
    glow.rotation_euler = (math.pi, 0, 0)
    collection.objects.link(glow)
    for frame, w in ((F_DAMPER_OPEN[0] - 2, 0.0), (F_DAMPER_OPEN[1], 9.0), (F_DAMPER + 1, 9.0), (F_DAMPER + 8, 0.0)):
        glow_data.energy = w
        glow_data.keyframe_insert("energy", frame=frame)

    # x-ray on the cooler shell
    for mat in M.xray_materials():
        node = mat.node_tree.nodes.get(M.XRAY_NODE)
        if node:
            _key_value(node, ((F_XRAY_ON[0], 0.0), (F_XRAY_ON[1], 1.0), (F_XRAY_OFF[0], 1.0), (F_XRAY_OFF[1], 0.0)))

    # the wire cage only exists during the x-ray beat
    cage = out.get("cooler", {}).get("cage")
    if cage:
        for frame, hidden in ((0, True), (F_XRAY_ON[0], False), (F_XRAY_OFF[1] + 1, True)):
            cage.hide_render = cage.hide_viewport = hidden
            cage.keyframe_insert("hide_render", frame=frame)
            cage.keyframe_insert("hide_viewport", frame=frame)

    # blue light inside the cooler while it is see-through
    core_data = bpy.data.lights.new("Cooler core light", "POINT")
    core_data.color = (0.30, 0.56, 1.0)
    core_data.shadow_soft_size = 0.2
    core = bpy.data.objects.new("Cooler core light", core_data)
    core.location = (C.COOLER_X - 0.2, 0, C.AXIS_Z + 0.25)
    collection.objects.link(core)
    for frame, w in ((F_XRAY_ON[0], 0.0), (F_XRAY_ON[1], 70.0), (F_XRAY_OFF[0], 70.0), (F_XRAY_OFF[1], 0.0)):
        core_data.energy = w
        core_data.keyframe_insert("energy", frame=frame)

    # sky light fades out once the camera is inside
    world = scene.world
    amb = world.node_tree.nodes.get(L.AMBIENT_NODE) if world and world.node_tree else None
    if amb:
        _key_value(amb, ((F_PAD - 8, 1.0), (F_FAN + 2, 0.04), (F_DAMPER - 4, 0.04), (F_DAMPER + 10, 0.34)))

    # fan: a driver, with the phase chosen so a gap is overhead as the camera passes
    fan = out.get("cooler", {}).get("fan")
    if fan:
        gap = math.pi / K.FAN_BLADES
        phase = (math.pi / 2 + gap) - FAN_STEP * F_FAN
        fc = fan.driver_add("rotation_euler", 0)
        fc.driver.type = "SCRIPTED"
        fc.driver.expression = f"frame * {FAN_STEP:.6f} + {phase:.6f}"

    # damper blades swing open
    for blade in out.get("duct", {}).get("blades", []):
        sign = blade.get("open_sign", 1)
        blade.rotation_euler = (0, 0, 0)
        blade.keyframe_insert("rotation_euler", frame=F_DAMPER_OPEN[0])
        blade.rotation_euler = (0, sign * math.pi / 2, 0)
        blade.keyframe_insert("rotation_euler", frame=F_DAMPER_OPEN[1])

    scene.frame_set(0)
    return {"camera": cam}
