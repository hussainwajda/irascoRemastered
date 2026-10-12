"""Rebuild the whole "Follow the air" scene from scratch.

Run inside Blender:

    import sys; sys.path.insert(0, "<repo>/3d")
    import story.build as b; b.run()

or headless:  blender -b -P 3d/story/build.py -- --save 3d/irasco-story.blend
"""

import importlib
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)


def _mods():
    names = ["common", "materials", "duct", "cooler", "terrace", "restaurant", "fx", "lighting", "camera"]
    mods = {}
    for n in names:
        try:
            mod = importlib.import_module(f"story.{n}")
        except ModuleNotFoundError as err:
            if err.name != f"story.{n}":
                raise
            continue
        mods[n] = importlib.reload(mod)
    return mods


def run(parts=None):
    """parts: optional subset of {"terrace", "cooler", "duct", "restaurant", "fx", "lighting", "camera"}."""
    m = _mods()
    C, M = m["common"], m["materials"]
    want = lambda p: (parts is None or p in parts) and p in m

    C.reset_scene()
    M.reset_cache()
    out = {}
    if want("terrace"):
        m["terrace"].build(C.coll("Terrace"))
    if want("cooler"):
        out["cooler"] = m["cooler"].build(C.coll("Cooler"))
    if want("duct"):
        out["duct"] = m["duct"].build_supply(C.coll("Supply duct"))
    if want("restaurant"):
        out["restaurant"] = m["restaurant"].build(C.coll("Restaurant"))
    if want("fx"):
        out["fx"] = m["fx"].build(C.coll("Airflow"), out)
    if want("lighting"):
        out["lighting"] = m["lighting"].build(C.coll("Lighting"), out)
    if want("camera"):
        out["camera"] = m["camera"].build(C.coll("Camera"), out)
    return out


if __name__ == "__main__":
    import bpy

    run()
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    if "--save" in argv:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(argv[argv.index("--save") + 1]))
