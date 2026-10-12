"""Sun, sky, practical lights and EEVEE settings."""

import math

import bpy
from mathutils import Vector

from . import common as C
from . import restaurant as R

AMBIENT_NODE = "AMBIENT"  # Value node keyframed by camera.py
SUN_DIR = Vector((0.42, -0.80, 0.30)).normalized()  # direction towards the sun
RES = (1280, 720)
FPS = 30


def _try(obj, attr, value):
    try:
        setattr(obj, attr, value)
        return True
    except Exception as err:
        print(f"[lighting] skipped {attr}={value!r}: {err}")
        return False


def _light(collection, name, kind, energy, color, loc, aim=None, **props):
    data = bpy.data.lights.new(name, kind)
    data.energy = energy
    data.color = color
    for k, v in props.items():
        _try(data, k, v)
    ob = bpy.data.objects.new(name, data)
    ob.location = loc
    if aim is not None:
        ob.rotation_euler = Vector(aim).normalized().to_track_quat("-Z", "Y").to_euler()
    collection.objects.link(ob)
    return ob


def _world(scene):
    world = scene.world or bpy.data.worlds.new("World")
    scene.world = world
    try:
        world.use_nodes = True
    except Exception:
        pass
    nt = world.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputWorld")
    bg = nt.nodes.new("ShaderNodeBackground")
    sky = nt.nodes.new("ShaderNodeTexSky")
    for kind in ("MULTIPLE_SCATTERING", "NISHITA", "HOSEK_WILKIE"):
        if _try(sky, "sky_type", kind):
            break
    elev = math.asin(SUN_DIR.z)
    _try(sky, "sun_elevation", elev)
    _try(sky, "sun_rotation", math.atan2(SUN_DIR.x, SUN_DIR.y))
    _try(sky, "sun_disc", False)
    _try(sky, "sun_direction", SUN_DIR)
    for attr, val in (("air_density", 1.0), ("aerosol_density", 4.0), ("dust_density", 2.2), ("ozone_density", 1.0), ("altitude", 480.0)):
        _try(sky, attr, val) if hasattr(sky, attr) else None

    # camera sees the sky at full strength; how much it lights the scene is
    # keyframed, so the duct and the room are not flooded by sky light
    lp = nt.nodes.new("ShaderNodeLightPath")
    amb = nt.nodes.new("ShaderNodeValue")
    amb.name = amb.label = AMBIENT_NODE
    amb.outputs[0].default_value = 1.0
    mix = nt.nodes.new("ShaderNodeMix")
    mix.data_type = "FLOAT"
    nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs["Factor"])
    nt.links.new(amb.outputs[0], mix.inputs["A"])
    mix.inputs["B"].default_value = 1.0
    gain = nt.nodes.new("ShaderNodeMath")
    gain.operation = "MULTIPLY"
    gain.inputs[1].default_value = 0.075
    gain.name = "SKY_GAIN"
    nt.links.new(mix.outputs["Result"], gain.inputs[0])
    nt.links.new(sky.outputs["Color"], bg.inputs["Color"])
    nt.links.new(gain.outputs["Value"], bg.inputs["Strength"])
    nt.links.new(bg.outputs["Background"], out.inputs["Surface"])
    return world


def _render_settings(scene):
    r = scene.render
    r.resolution_x, r.resolution_y = RES
    r.resolution_percentage = 100
    r.fps = FPS
    r.film_transparent = False
    ee = scene.eevee
    _try(ee, "taa_render_samples", 32)
    _try(ee, "taa_samples", 16)
    _try(ee, "use_raytracing", True)
    _try(ee, "use_shadows", True)
    _try(ee, "use_fast_gi", True)
    _try(ee, "fast_gi_distance", 4.0)
    _try(ee, "shadow_ray_count", 2)
    for pool in ("1024", "2048"):  # the default pool overflows with this many lights
        _try(ee, "shadow_pool_size", pool)
    _try(ee, "shadow_step_count", 6)
    _try(ee, "use_volumetric_shadows", False)
    vs = scene.view_settings
    _try(vs, "view_transform", "AgX")
    for look in ("AgX - Medium High Contrast", "Medium High Contrast", "AgX - Punchy"):
        if _try(vs, "look", look):
            break
    _try(vs, "exposure", 0.0)


def build(collection, out=None):
    scene = bpy.context.scene
    _world(scene)
    _render_settings(scene)

    sun = _light(collection, "Sun", "SUN", 5.0, (1.0, 0.76, 0.50), (0, 0, 30), aim=-SUN_DIR, angle=math.radians(1.2))

    # daylight through the windows: sun side warm, shade side cool
    wh = R.WIN_Z1 - R.WIN_Z0
    zc = (R.WIN_Z0 + R.WIN_Z1) / 2
    for x in R.window_xs():
        _light(collection, f"Window sun {x}", "AREA", 105, (1.0, 0.86, 0.68), (x, C.Y0 + C.WALL_T + 0.05, zc), aim=(0, 1, -0.25), shape="RECTANGLE", size=R.WIN_W, size_y=wh)
        _light(collection, f"Window sky {x}", "AREA", 130, (0.72, 0.84, 1.0), (x, C.Y1 - C.WALL_T - 0.05, zc), aim=(0, -1, -0.2), shape="RECTANGLE", size=R.WIN_W, size_y=wh)

    lamps = (out or {}).get("restaurant", {}).get("lamps", [])
    for i, (x, y, z) in enumerate(lamps):
        _light(collection, f"Pendant {i}", "POINT", 30, (1.0, 0.66, 0.36), (x, y, z), shadow_soft_size=0.06)

    # soft bounce so the dining room is not black where no window reaches
    for i, x in enumerate((-2.6, 2.4)):
        _light(collection, f"Dining fill {i}", "AREA", 80, (1.0, 0.86, 0.70), (x, 0, 2.7), aim=(0, 0, -1), shape="RECTANGLE", size=4.0, size_y=7.0)
    for i, x in enumerate((1.4, 3.8)):
        for s in (1, -1):
            _light(collection, f"Table spot {i}{s}", "SPOT", 120, (1.0, 0.74, 0.46), (x, s * 0.75, 3.6), aim=(0, -s * 0.24, -1), spot_size=math.radians(42), spot_blend=0.6, shadow_soft_size=0.04)

    # kitchen: bright and a little cooler, so the eye lands on the hood
    _light(collection, "Kitchen ceiling", "AREA", 210, (1.0, 0.96, 0.90), (7.1, 0, 3.6), aim=(0.15, 0, -1), shape="RECTANGLE", size=2.2, size_y=6.0)
    _light(collection, "Hood light", "AREA", 110, (1.0, 0.90, 0.74), (C.X1 - C.WALL_T - 0.55, 0, 2.5), aim=(0, 0, -1), shape="RECTANGLE", size=0.5, size_y=4.4)
    _light(collection, "Pass glow", "AREA", 60, (1.0, 0.72, 0.42), (C.KITCHEN_X + 0.3, 0, 2.3), aim=(-0.2, 0, -1), shape="RECTANGLE", size=0.4, size_y=6.0)
    # daylight leaking in at every flange joint of the supply run
    for i, j in enumerate((out or {}).get("duct", {}).get("joints", [])):
        _light(collection, f"Joint leak {i}", "POINT", 1.6, (0.70, 0.86, 1.0), tuple(j), shadow_soft_size=0.12, use_shadow=False)

    # reflection probes, so metal indoors mirrors the room and not the sky
    for name, loc, size in (("Dining probe", (0.0, 0.0, 1.9), 7.5), ("Kitchen probe", (7.3, 0.0, 1.8), 3.2)):
        try:
            probe = bpy.data.lightprobes.new(name, "SPHERE")
            probe.influence_type = "BOX"
            probe.influence_distance = size
            ob = bpy.data.objects.new(name, probe)
            ob.location = loc
            collection.objects.link(ob)
        except Exception as err:
            print(f"[lighting] probe skipped: {err}")
    return {"sun": sun}
