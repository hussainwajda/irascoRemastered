"""Procedural materials. No image textures, so the .blend stays small and
nothing depends on an asset library being switched on."""

import bpy

_cache = {}

XRAY_NODE = "XRAY"  # Value node keyframed by camera.py
XRAY_BLUE = (0.16, 0.42, 1.0)


def _new(name):
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    nt = m.node_tree
    bsdf = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
    out = next(n for n in nt.nodes if n.type == "OUTPUT_MATERIAL")
    return m, nt, bsdf, out


def _set(bsdf, **kw):
    for key, val in kw.items():
        name = {
            "color": "Base Color",
            "metallic": "Metallic",
            "rough": "Roughness",
            "alpha": "Alpha",
            "ecolor": "Emission Color",
            "estrength": "Emission Strength",
            "coat": "Coat Weight",
            "aniso": "Anisotropic",
            "spec": "Specular IOR Level",
            "transmission": "Transmission Weight",
            "ior": "IOR",
        }[key]
        sock = bsdf.inputs.get(name)
        if sock is None:
            continue
        if key in ("color", "ecolor") and len(val) == 3:
            val = (*val, 1.0)
        sock.default_value = val


def _coords(nt, scale=(1, 1, 1), kind="Object"):
    tc = nt.nodes.new("ShaderNodeTexCoord")
    mp = nt.nodes.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = scale
    nt.links.new(tc.outputs[kind], mp.inputs["Vector"])
    return mp.outputs["Vector"]


def _ramp(nt, fac, stops):
    r = nt.nodes.new("ShaderNodeValToRGB")
    els = r.color_ramp.elements
    while len(els) < len(stops):
        els.new(0.5)
    for el, (pos, col) in zip(els, stops):
        el.position = pos
        el.color = (*col, 1.0) if len(col) == 3 else col
    nt.links.new(fac, r.inputs["Fac"])
    return r.outputs["Color"]


def _bump(nt, height, bsdf, strength=0.3, distance=0.01):
    b = nt.nodes.new("ShaderNodeBump")
    b.inputs["Strength"].default_value = strength
    b.inputs["Distance"].default_value = distance
    nt.links.new(height, b.inputs["Height"])
    nt.links.new(b.outputs["Normal"], bsdf.inputs["Normal"])


def _noise(nt, vec, scale=5.0, detail=6.0, rough=0.6):
    n = nt.nodes.new("ShaderNodeTexNoise")
    n.inputs["Scale"].default_value = scale
    n.inputs["Detail"].default_value = detail
    n.inputs["Roughness"].default_value = rough
    nt.links.new(vec, n.inputs["Vector"])
    return n.outputs["Fac"]


def simple(name, color, rough=0.5, metallic=0.0, **kw):
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    _set(bsdf, color=color, rough=rough, metallic=metallic, **kw)
    _cache[name] = m
    return m


def emissive(name, color, strength):
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    _set(bsdf, color=(0, 0, 0), rough=1.0, ecolor=color, estrength=strength)
    _cache[name] = m
    return m


def galvanized(name="GI steel", tint=(0.66, 0.69, 0.72), spangle=70.0):
    """Hot-dip galvanized sheet: bright zinc with a crystalline spangle."""
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    vec = _coords(nt)
    vor = nt.nodes.new("ShaderNodeTexVoronoi")
    vor.inputs["Scale"].default_value = spangle
    nt.links.new(vec, vor.inputs["Vector"])
    bw = nt.nodes.new("ShaderNodeRGBToBW")
    nt.links.new(vor.outputs["Color"], bw.inputs["Color"])
    lo = tuple(c * 0.90 for c in tint)
    hi = tuple(min(1.0, c * 1.06) for c in tint)
    col = _ramp(nt, bw.outputs["Val"], [(0.2, lo), (0.8, hi)])
    nt.links.new(col, bsdf.inputs["Base Color"])
    rr = nt.nodes.new("ShaderNodeMapRange")
    rr.inputs["To Min"].default_value = 0.30
    rr.inputs["To Max"].default_value = 0.40
    nt.links.new(bw.outputs["Val"], rr.inputs["Value"])
    nt.links.new(rr.outputs["Result"], bsdf.inputs["Roughness"])
    _set(bsdf, metallic=1.0)
    _cache[name] = m
    return m


def stainless(name="Stainless steel"):
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    vec = _coords(nt, scale=(1, 1, 220))
    n = _noise(nt, vec, scale=8.0, detail=2.0)
    rr = nt.nodes.new("ShaderNodeMapRange")
    rr.inputs["To Min"].default_value = 0.16
    rr.inputs["To Max"].default_value = 0.30
    nt.links.new(n, rr.inputs["Value"])
    nt.links.new(rr.outputs["Result"], bsdf.inputs["Roughness"])
    _set(bsdf, color=(0.72, 0.73, 0.74), metallic=1.0)
    _cache[name] = m
    return m


def noisy(name, c1, c2, scale=6.0, rough=0.8, bump=0.25, metallic=0.0, detail=8.0, stretch=(1, 1, 1)):
    """Two-tone noise material for plaster, concrete, plastic and fabric."""
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    vec = _coords(nt, scale=stretch)
    n = _noise(nt, vec, scale=scale, detail=detail)
    col = _ramp(nt, n, [(0.3, c1), (0.7, c2)])
    nt.links.new(col, bsdf.inputs["Base Color"])
    _set(bsdf, rough=rough, metallic=metallic)
    if bump:
        fine = _noise(nt, vec, scale=scale * 14, detail=3.0)
        _bump(nt, fine, bsdf, strength=bump, distance=0.004)
    _cache[name] = m
    return m


def wood(name="Wood", c1=(0.20, 0.10, 0.045), c2=(0.42, 0.23, 0.10)):
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    vec = _coords(nt, scale=(1.0, 9.0, 9.0))
    n = _noise(nt, vec, scale=4.0, detail=9.0, rough=0.7)
    col = _ramp(nt, n, [(0.32, c1), (0.68, c2)])
    nt.links.new(col, bsdf.inputs["Base Color"])
    _set(bsdf, rough=0.42, coat=0.15)
    _bump(nt, n, bsdf, strength=0.12, distance=0.002)
    _cache[name] = m
    return m


def pad(name="Cooling pad"):
    """Honeycomb cellulose pad: fluted brown paper, darker where it is wet."""
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    vec = _coords(nt)
    w1 = nt.nodes.new("ShaderNodeTexWave")
    w1.wave_type = "BANDS"
    w1.bands_direction = "DIAGONAL"
    w1.inputs["Scale"].default_value = 26.0
    w1.inputs["Distortion"].default_value = 0.6
    nt.links.new(vec, w1.inputs["Vector"])
    n = _noise(nt, vec, scale=2.2, detail=4.0)
    mix = nt.nodes.new("ShaderNodeMix")
    mix.data_type = "RGBA"
    mix.inputs["A"].default_value = (0.20, 0.12, 0.06, 1)
    mix.inputs["B"].default_value = (0.46, 0.31, 0.16, 1)
    nt.links.new(w1.outputs["Fac"], mix.inputs["Factor"])
    wet = nt.nodes.new("ShaderNodeMix")
    wet.data_type = "RGBA"
    wet.blend_type = "MULTIPLY"
    wet.inputs["B"].default_value = (0.55, 0.62, 0.66, 1)
    nt.links.new(n, wet.inputs["Factor"])
    nt.links.new(mix.outputs["Result"], wet.inputs["A"])
    nt.links.new(wet.outputs["Result"], bsdf.inputs["Base Color"])
    _set(bsdf, rough=0.55)
    _bump(nt, w1.outputs["Fac"], bsdf, strength=0.9, distance=0.012)
    _cache[name] = m
    return m


def tiles(name, c1, c2, grout=(0.25, 0.24, 0.23), size=0.6, rough=0.25):
    """Square floor or wall tiles with grout lines."""
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    vec = _coords(nt, scale=(1 / size, 1 / size, 1 / size))
    br = nt.nodes.new("ShaderNodeTexBrick")
    br.offset = 0.0
    br.inputs["Scale"].default_value = 1.0
    br.inputs["Mortar Size"].default_value = 0.012
    br.inputs["Brick Width"].default_value = 1.0
    br.inputs["Row Height"].default_value = 1.0
    br.inputs["Color1"].default_value = (*c1, 1)
    br.inputs["Color2"].default_value = (*c2, 1)
    br.inputs["Mortar"].default_value = (*grout, 1)
    nt.links.new(vec, br.inputs["Vector"])
    nt.links.new(br.outputs["Color"], bsdf.inputs["Base Color"])
    rr = nt.nodes.new("ShaderNodeMapRange")
    rr.inputs["To Min"].default_value = rough
    rr.inputs["To Max"].default_value = 0.8
    nt.links.new(br.outputs["Fac"], rr.inputs["Value"])
    nt.links.new(rr.outputs["Result"], bsdf.inputs["Roughness"])
    _bump(nt, br.outputs["Fac"], bsdf, strength=-0.4, distance=0.003)
    _cache[name] = m
    return m


def xrayify(m, keep=0.0):
    """Blend a material towards a see-through blue ghost as XRAY goes 0 -> 1.
    `keep` leaves that much of the original surface visible (used for the pads)."""
    if m.get("xray"):
        return m
    nt = m.node_tree
    out = next(n for n in nt.nodes if n.type == "OUTPUT_MATERIAL")
    src = out.inputs["Surface"].links[0].from_socket

    fac = nt.nodes.new("ShaderNodeValue")
    fac.name = fac.label = XRAY_NODE
    fac.outputs[0].default_value = 0.0

    lw = nt.nodes.new("ShaderNodeLayerWeight")
    lw.inputs["Blend"].default_value = 0.18
    rim = nt.nodes.new("ShaderNodeMath")
    rim.operation = "MULTIPLY"
    rim.inputs[1].default_value = 0.35
    nt.links.new(lw.outputs["Facing"], rim.inputs[0])

    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (*XRAY_BLUE, 1)
    em.inputs["Strength"].default_value = 1.6
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    ghost = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(rim.outputs["Value"], ghost.inputs["Fac"])
    nt.links.new(tr.outputs["BSDF"], ghost.inputs[1])
    nt.links.new(em.outputs["Emission"], ghost.inputs[2])

    kept = nt.nodes.new("ShaderNodeMixShader")
    kept.inputs["Fac"].default_value = keep
    nt.links.new(ghost.outputs["Shader"], kept.inputs[1])
    nt.links.new(src, kept.inputs[2])

    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(fac.outputs[0], mix.inputs["Fac"])
    nt.links.new(src, mix.inputs[1])
    nt.links.new(kept.outputs["Shader"], mix.inputs[2])
    nt.links.new(mix.outputs["Shader"], out.inputs["Surface"])

    try:
        m.surface_render_method = "DITHERED"
    except Exception:
        pass
    try:
        m.use_transparent_shadow = True
    except Exception:
        pass
    m["xray"] = True
    return m


def xray_cage(name="Xray cage"):
    """Blue construction lines drawn on the wireframe copy of the shell."""
    if name in _cache:
        return _cache[name]
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    fac = nt.nodes.new("ShaderNodeValue")
    fac.name = fac.label = XRAY_NODE
    em = nt.nodes.new("ShaderNodeEmission")
    em.inputs["Color"].default_value = (0.30, 0.58, 1.0, 1)
    em.inputs["Strength"].default_value = 2.4
    tr = nt.nodes.new("ShaderNodeBsdfTransparent")
    mix = nt.nodes.new("ShaderNodeMixShader")
    nt.links.new(fac.outputs[0], mix.inputs["Fac"])
    nt.links.new(tr.outputs["BSDF"], mix.inputs[1])
    nt.links.new(em.outputs["Emission"], mix.inputs[2])
    nt.links.new(mix.outputs["Shader"], out.inputs["Surface"])
    try:
        m.surface_render_method = "DITHERED"
        m.use_transparent_shadow = True
    except Exception:
        pass
    m["xray"] = True
    _cache[name] = m
    return m


def duct_seam():
    """Joint line inside the ducts. Slightly emissive: daylight leaking at the
    flanges gives the fly-through its rhythm."""
    return simple("Duct seam", (0.10, 0.11, 0.12), rough=0.7, metallic=0.6, ecolor=(0.62, 0.82, 1.0), estrength=2.2)


def town_wall(name, color):
    """Painted plaster with a grid of dark windows on the vertical faces."""
    if name in _cache:
        return _cache[name]
    m, nt, bsdf, out = _new(name)
    tc = nt.nodes.new("ShaderNodeTexCoord")
    geo = nt.nodes.new("ShaderNodeNewGeometry")
    pos = nt.nodes.new("ShaderNodeSeparateXYZ")
    nor = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Object"], pos.inputs["Vector"])
    nt.links.new(geo.outputs["Normal"], nor.inputs["Vector"])

    def mth(op, a, b=None, vb=0.0):
        n = nt.nodes.new("ShaderNodeMath")
        n.operation = op
        n.inputs[1].default_value = vb
        if isinstance(a, float):
            n.inputs[0].default_value = a
        else:
            nt.links.new(a, n.inputs[0])
        if b is not None:
            nt.links.new(b, n.inputs[1])
        return n.outputs["Value"]

    ax, ay, az_ = mth("ABSOLUTE", nor.outputs["X"]), mth("ABSOLUTE", nor.outputs["Y"]), mth("ABSOLUTE", nor.outputs["Z"])
    along = mth("ADD", mth("MULTIPLY", pos.outputs["X"], ay), mth("MULTIPLY", pos.outputs["Y"], ax))
    hx = mth("FRACT", mth("MULTIPLY", along, vb=1 / 2.4))
    vz = mth("FRACT", mth("MULTIPLY", pos.outputs["Z"], vb=1 / 3.0))
    in_h = mth("MULTIPLY", mth("GREATER_THAN", hx, vb=0.30), mth("LESS_THAN", hx, vb=0.70))
    in_v = mth("MULTIPLY", mth("GREATER_THAN", vz, vb=0.40), mth("LESS_THAN", vz, vb=0.74))
    wall = mth("LESS_THAN", az_, vb=0.5)
    win = mth("MULTIPLY", mth("MULTIPLY", in_h, in_v), wall)

    vec = _coords(nt)
    n = _noise(nt, vec, scale=0.35, detail=6.0)
    paint = _ramp(nt, n, [(0.3, tuple(c * 0.8 for c in color)), (0.7, color)])
    mix = nt.nodes.new("ShaderNodeMix")
    mix.data_type = "RGBA"
    mix.inputs["B"].default_value = (0.02, 0.028, 0.035, 1)
    nt.links.new(win, mix.inputs["Factor"])
    nt.links.new(paint, mix.inputs["A"])
    nt.links.new(mix.outputs["Result"], bsdf.inputs["Base Color"])
    rr = nt.nodes.new("ShaderNodeMapRange")
    rr.inputs["To Min"].default_value = 0.9
    rr.inputs["To Max"].default_value = 0.12
    nt.links.new(win, rr.inputs["Value"])
    nt.links.new(rr.outputs["Result"], bsdf.inputs["Roughness"])
    _cache[name] = m
    return m


def xray_materials():
    return [m for m in bpy.data.materials if m.get("xray")]


def reset_cache():
    _cache.clear()
