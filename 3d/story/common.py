"""Shared helpers for the IRASCO "Follow the air" story scene.

Everything is built procedurally so the scene can be rebuilt from scratch with
`3d/story/build.py`. Units are metres, Z is up.
"""

import math

import bmesh
import bpy
from mathutils import Matrix, Vector

# ---------------------------------------------------------------- layout
# One-storey building: restaurant below, terrace above.
X0, X1 = -11.0, 9.0  # building length
Y0, Y1 = -5.0, 5.0  # building width
ROOM_H = 3.8  # floor to slab underside
SLAB_T = 0.25
TERRACE_Z = ROOM_H + SLAB_T
WALL_T = 0.23

# Cooler on the terrace, discharge facing +X.
COOLER_X, COOLER_Y = -9.2, 0.0
COOLER_S = 1.3  # plan size
COOLER_H = 1.35
STAND_H = 0.55
COOLER_Z0 = TERRACE_Z + STAND_H
AXIS_Z = COOLER_Z0 + 0.22 + (COOLER_H - 0.30) / 2  # fan and duct centre line

# Supply duct: along +X on the terrace, down through the slab, into the room.
DUCT_W, DUCT_H = 0.8, 0.6  # terrace run (width along Y, height along Z)
DROP_X = -1.0  # centre of the vertical drop
ELBOW_R = 0.75  # centre-line radius of the elbow
PLENUM_Z = 3.2  # centre of the plenum box and the room trunk
TRUNK_W, TRUNK_H = 0.7, 0.45
TRUNK_END_X = 4.6

# Restaurant
DINING_X0 = -5.5  # partition wall between lobby and dining room
KITCHEN_X = 5.6  # pass counter line


# ---------------------------------------------------------------- scene
def reset_scene():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for c in list(bpy.data.collections):
        bpy.data.collections.remove(c)
    for blocks in (
        bpy.data.meshes,
        bpy.data.materials,
        bpy.data.lights,
        bpy.data.cameras,
        bpy.data.curves,
        bpy.data.actions,
    ):
        for b in list(blocks):
            try:
                blocks.remove(b)
            except Exception:
                pass


def coll(name, parent=None):
    c = bpy.data.collections.get(name)
    if c is None:
        c = bpy.data.collections.new(name)
        (parent or bpy.context.scene.collection).children.link(c)
    return c


# ---------------------------------------------------------------- bmesh
def _faces_of(verts):
    faces = set()
    for v in verts:
        faces.update(v.link_faces)
    return faces


def trs(loc=(0, 0, 0), rot=None, scale=(1, 1, 1)):
    m = Matrix.Translation(Vector(loc))
    if rot is not None:
        m = m @ (rot if isinstance(rot, Matrix) else rot.to_matrix().to_4x4())
    return m @ Matrix.Diagonal((*scale, 1.0))


def rot_xyz(rx=0.0, ry=0.0, rz=0.0):
    return (
        Matrix.Rotation(rz, 4, "Z") @ Matrix.Rotation(ry, 4, "Y") @ Matrix.Rotation(rx, 4, "X")
    )


def bm_box(bm, size, loc, rot=None, mi=0):
    """Axis-aligned (or rotated) box centred on loc."""
    r = bmesh.ops.create_cube(bm, size=1.0, matrix=trs(loc, rot, size))
    for f in _faces_of(r["verts"]):
        f.material_index = mi
    return r["verts"]


def bm_cyl(bm, radius, depth, loc, axis="Z", mi=0, segs=24, radius2=None, smooth=True, rot=None):
    """Cylinder or cone centred on loc with its length along `axis`."""
    base = {"Z": Matrix.Identity(4), "X": Matrix.Rotation(math.pi / 2, 4, "Y"), "Y": Matrix.Rotation(-math.pi / 2, 4, "X")}[axis]
    m = Matrix.Translation(Vector(loc)) @ (rot if rot is not None else Matrix.Identity(4)) @ base
    r = bmesh.ops.create_cone(
        bm,
        cap_ends=True,
        cap_tris=False,
        segments=segs,
        radius1=radius,
        radius2=radius if radius2 is None else radius2,
        depth=depth,
        matrix=m,
    )
    for f in _faces_of(r["verts"]):
        f.material_index = mi
        if smooth and len(f.verts) == 4:
            f.smooth = True
    return r["verts"]


def bm_quad(bm, pts, mi=0):
    vs = [bm.verts.new(p) for p in pts]
    f = bm.faces.new(vs)
    f.material_index = mi
    return f


def finish(name, bm, collection, mats=(), bevel=0.0, loc=(0, 0, 0), weld=False):
    """Turn a bmesh into a linked object. `mats` fills the material slots in order."""
    if weld:
        bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    for m in mats:
        me.materials.append(m)
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    collection.objects.link(ob)
    if bevel > 0:
        mod = ob.modifiers.new("Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        mod.limit_method = "ANGLE"
        mod.angle_limit = math.radians(40)
        try:
            mod.harden_normals = True
        except Exception:
            pass
    return ob


def lerp(a, b, t):
    return a + (b - a) * t


def smoothstep(e0, e1, x):
    if e0 == e1:
        return 0.0 if x < e0 else 1.0
    t = max(0.0, min(1.0, (x - e0) / (e1 - e0)))
    return t * t * (3 - 2 * t)
