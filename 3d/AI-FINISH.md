# Finishing the story film with AI image and video models

The home page film ("Follow the air") is built and rendered in Blender (`3d/story/`). That render is the layout: camera path, duct geometry and timing are correct and must stay as they are. This file has the prompts for pushing selected shots towards photoreal with an image or video model, and the steps for getting the result back onto the site.

**Scope.** AI imagery is allowed for this film only. It is a labelled 3D illustration ("3D illustration of a typical install"). Nothing here may be used as a project photo, a workshop photo or a team photo, and the label stays on.

## How it fits together

| Step | What | Where |
|---|---|---|
| 1 | Blender renders 300 frames per orientation | `3d/renders/landscape/f_0000.png` … `f_0299.png` (1280×720), `3d/renders/portrait/` (540×960, every 2nd frame) |
| 2 | You restyle key frames or shots with a model | prompts below |
| 3 | Put the new frames back under the same names | commands at the end |
| 4 | `node scripts/encode-story.mjs` | writes `public/story/v2/…` (bump the version if it has been deployed) |

Reference stills for every shot are in `3d/renders/refs/` after running `node scripts/export-refs.mjs`. Upload those as the start, end or structure image.

## Rules for every prompt

Paste this block at the end of each prompt (or into the negative prompt field where the tool has one).

```
Keep the exact camera position, framing and geometry of the reference image. Do not add, remove or move objects.
No people, no text, no logos, no brand names, no signage, no watermarks.
Ducts are rectangular galvanized steel with angle-iron flanged joints every 1.2 m and faint cross-break creases on each panel. Do not turn them into round or flexible ducts.
Negative: cartoon, illustration, CGI look, plastic, oversaturated, HDR halo, lens flare, fisheye, tilt-shift, motion blur, duplicate objects, warped straight lines, extra windows, text, letters, numbers.
```

## Recommended split

A film that is scrubbed by scroll shows every flicker, because the visitor can stop on any frame. So:

| Shot | Frames | Recommendation |
|---|---|---|
| A. Terrace approach | 0–62 | AI video from start and end frame. Biggest gain: real sky, plaster, weathering |
| B. Cooler turns see-through | 62–122 | Keep the Blender render. Models cannot hold the blue construction lines steady |
| C. Through the pad and fan | 122–150 | Keep Blender |
| D. Along the duct | 150–200 | Keep Blender, or image-restyle and re-render (see textures) |
| E. Drop and damper | 200–236 | Keep Blender |
| F. Restaurant reveal | 236–299 | AI video from start and end frame. Second biggest gain: materials, light, furniture |

Shots A and F hand over to Blender shots at frames 62 and 236. Use the Blender frame as the **end frame of A** and the **start frame of F** so the joins match, then cross-fade 4 frames at each join.

## Shot A: terrace approach (video, start + end frame)

Start image `refs/A_start_f0000.png`, end image `refs/A_end_f0062.png`. Length 4 to 5 seconds, 16:9.

```
Slow, steady drone push-in towards a commercial evaporative air cooler on the flat roof terrace of a single-storey restaurant building in a small central Indian town, late afternoon in summer.

The cooler is a white steel box about 1.3 m wide with a blue lid and blue base tank, horizontal louvres on three sides with brown honeycomb cooling pads behind them, standing on a black painted steel angle frame. A rectangular galvanized steel duct leaves its far side, runs along the terrace on black steel stands, and bends down through the roof slab. Behind it: a small stair-head room with a blue door, a black plastic water tank on a brick plinth, two split-AC outdoor units against the parapet, and a galvanized kitchen exhaust riser with a curved cowl.

Terrace floor of worn terracotta tiles with dust in the joints and old water stains. Ochre painted plaster parapet with rain streaks and a grey stone coping. Around the building, low flat-roofed concrete houses in faded pastel paint with rooftop water tanks, a few neem trees, heat haze over the horizon.

Hard warm sunlight from the right, long shadows, pale dusty blue sky going warm at the horizon. Photorealistic, shot on a 35 mm lens, natural colour, slight atmospheric haze, fine film grain.

Camera: one continuous smooth move, descending slightly and pushing forward, no shake, no cuts.
```

## Shot F: restaurant reveal (video, start + end frame)

Start image `refs/F_start_f0236.png` (looking straight down at a round table), end image `refs/F_end_f0299.png`. Length 5 seconds, 16:9.

```
The camera starts just under the ceiling looking straight down at a round teak dining table set with four white plates, four glasses and a small brass vase of marigolds, four green upholstered wooden chairs around it. It descends, pulls back and tilts up in one smooth move to reveal the whole dining room.

A mid-range Indian restaurant in the afternoon. Exposed rectangular galvanized steel air duct hanging from a matte charcoal ceiling on threaded rods, running down the middle of the room with white supply grilles along both sides. Rows of round teak tables with green chairs. Black cone pendant lamps with warm bulbs over the side tables. Warm sand-coloured plaster walls above a dark wood dado, tall steel-framed windows on both sides with sunlight falling across a polished dark stone tile floor. Potted areca palms in terracotta planters in the corners.

At the far end, an open kitchen behind a wood-fronted pass counter with a stainless steel top: a stainless cooking range against a white tiled wall, steel pots on the burners with a little steam, and a long stainless steel exhaust hood above it with a duct rising through the ceiling.

Photorealistic interior, soft daylight mixed with warm lamp light, gentle reflections on the floor, shot on a 20 mm lens, natural colour, no people.
```

## Key-frame restyle (image model, one frame at a time)

Use this when you only want better stills: the poster (frame 0), the share image and the four chapter stills. Give the reference frame as the structure or "image to edit" input.

```
Make this render photorealistic without changing the composition. Keep every object exactly where it is and keep all straight lines straight.
Replace flat CG surfaces with real ones: sun-bleached painted plaster with hairline cracks and rain streaks, worn terracotta roof tiles with dust, galvanized steel with a soft zinc spangle and slightly dull flanges, powder-coated white steel with small scuffs, honeycomb cellulose cooling pads that look damp.
Light: late afternoon sun from the right, warm, long soft-edged shadows, light haze in the distance.
Photograph, 35 mm lens, f/8, natural colour grading, fine grain.
```

For the see-through cooler frame (`refs/B_hold_f0104.png`) add:

```
Keep the cooler casing as a clean translucent blue technical overlay with thin luminous construction lines, like an engineering x-ray. The fan, motor, water tank and cooling pads inside stay solid and photoreal. Keep the thin amber lines of warm air being drawn in.
```

## Textures and sky for Blender (optional)

These go into the Blender scene instead of replacing frames, so the whole film stays stable. Generate square, seamless, evenly lit, no shadows, no perspective.

```
Seamless tileable texture, top-down, flat even lighting, no shadows: hot-dip galvanized steel sheet with a medium zinc spangle, a few faint handling scuffs, slight white oxidation near the edges. 2048x2048.
```

```
Seamless tileable texture, flat even lighting, no shadows: sun-bleached ochre exterior wall paint on cement plaster, hairline cracks, faint vertical rain streaks, a little dust near the bottom. 2048x2048.
```

```
Equirectangular 360 degree HDRI panorama, 2:1: late summer afternoon sky over a flat central Indian town, sun 20 degrees above the horizon, pale dusty blue overhead, warm haze at the horizon, a few thin high clouds, no buildings above the horizon line. 4096x2048.
```

## Portrait (phones)

Phones use their own 540×960 frames, not a crop. Either generate the same shot again from the portrait start and end frames (`refs/portrait/`), or generate the landscape shot at 4K and crop the centre 9:16, then check that the cooler, the duct mouth and the table stay centred.

## Putting AI frames back

A model returns a video (say `shotA.mp4`). Turn it into exactly the frames it replaces. Shot A is frames 0 to 62, so 63 frames:

```bash
ffmpeg -i shotA.mp4 -vf "scale=1280:720:flags=lanczos,fps=63/5" -frames:v 63 -start_number 0 3d/renders/landscape/f_%04d.png
```

Shot F is frames 236 to 299, so 64 frames:

```bash
ffmpeg -i shotF.mp4 -vf "scale=1280:720:flags=lanczos,fps=64/5" -frames:v 64 -start_number 236 3d/renders/landscape/f_%04d.png
```

Replace `5` with the clip's real length in seconds. Then re-encode:

```bash
node scripts/encode-story.mjs
```

Check the joins at frames 62 and 236 by scrubbing slowly in the browser. If the AI clip drifts from the Blender frame at the join, redo it with the Blender frame pinned as that clip's first or last frame.

To go back to the pure Blender version, re-render: `blender -b 3d/irasco-story.blend -P 3d/story/render.py -- --out 3d/renders/landscape --size 1280x720`.
