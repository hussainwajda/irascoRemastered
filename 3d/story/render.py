"""Render the film to numbered PNG frames, headless.

    blender -b 3d/irasco-story.blend -P 3d/story/render.py -- \
        --out 3d/renders/landscape --size 1280x720 [--portrait] [--start 0 --end 299] [--samples 32]

`--portrait` widens the lens a little so the cooler, the duct and the room
still fit the centre of a phone screen.
"""

import os
import sys

import bpy

argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []


def arg(name, default=None):
    return argv[argv.index(name) + 1] if name in argv else default


scene = bpy.context.scene
w, h = (int(v) for v in arg("--size", "1280x720").split("x"))
scene.render.resolution_x, scene.render.resolution_y = w, h
scene.render.resolution_percentage = 100
scene.frame_start = int(arg("--start", scene.frame_start))
scene.frame_end = int(arg("--end", scene.frame_end))
scene.frame_step = int(arg("--step", 1))
try:
    scene.eevee.taa_render_samples = int(arg("--samples", scene.eevee.taa_render_samples))
except Exception:
    pass

if "--portrait" in argv:
    cam = scene.camera.data
    scale = float(arg("--lens-scale", 0.80))
    # lift the subject: on a phone the caption card covers the lower third
    cam.shift_y = float(arg("--shift-y", -0.10))
    act = cam.animation_data.action if cam.animation_data else None
    if act is not None:
        curves = []
        if hasattr(act, "fcurves"):
            curves = list(act.fcurves)
        else:
            for layer in act.layers:
                for strip in layer.strips:
                    for bag in strip.channelbags:
                        curves += list(bag.fcurves)
        for fc in curves:
            if fc.data_path == "lens":
                for kp in fc.keyframe_points:
                    kp.co.y *= scale
                    kp.handle_left.y *= scale
                    kp.handle_right.y *= scale
                fc.update()

out = os.path.abspath(arg("--out", "3d/renders/landscape"))
os.makedirs(out, exist_ok=True)
scene.render.filepath = os.path.join(out, "f_")
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.image_settings.compression = 30
scene.render.use_file_extension = True
scene.render.use_overwrite = True

bpy.ops.render.render(animation=True)
print("RENDER_DONE", out)
