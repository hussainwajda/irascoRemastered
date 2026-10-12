# IRASCO rebuild: agent handoff

_Last updated 11 Oct 2026 (second session). Branch `next-migration`. **Nothing is committed yet**; ask the user before committing or pushing._

## Where things stand

The old Vite + Lovable site (fake AI images, invented specs, a contact form that never sent anything) has been replaced on this branch with a Next.js 16 site built only from verified facts. Phase 1 (foundation) and phase 2 (pages in 2D) are done.

Phase 3 (11 Oct 2026, second session) added the motion layer, modelled on <https://terminal-industries.com/>: a Blender-rendered film that scroll scrubs on the home page ("Follow the air": terrace cooler, through the duct, out into a restaurant), a pinned horizontal services run, a second film of a duct section being fabricated, and an interactive kitchen hood demo. Lint, type check and production build pass; the home page was checked in the browser at desktop and phone width and in the no-script fallback.

The next big piece is **look development on the film**: the user will push selected shots to photoreal with AI models using `3d/AI-FINISH.md`, and the Blender scene itself has a polish list below.

## Read first, in this order

1. `AGENTS.md`: project rules (facts only from `app/data/`, verbatim reviews, i18n, tokens, no stock photos). Also contains the Next.js 16 warning.
2. `README.md`: commands, structure, pre-launch checklist.
3. This file.
4. `app/data/business.ts`: every verified fact about the business.
5. `node_modules/next/dist/docs/`: this is Next.js **16.3.3**, which differs from older versions (see Gotchas). Read the relevant guide before writing Next-specific code.

## The client

IRASCO (इरास्को), "Ducting & Ventilation Work". A small contractor (under 10 staff) at Shri Sajjan Mills, Sailana Road, Ratlam, MP, working since 2017. They fabricate GI and stainless ducts in their own workshop and install ducting, commercial kitchen hoods, AC, ductable and evaporative coolers, HVLS fans, and industrial ventilation (axial, belt- and direct-drive fans, turbine ventilators, poultry fans, ring blowers, man coolers) across Ratlam and Indore. Ratings: Google 4.5 from 51 reviews, JustDial 5.0 from 55 ratings (checked 11 Oct 2026). WhatsApp +91 96308 59889 is their main lead channel. Most visitors are on mid-range Android phones arriving from Google or JustDial.

The user (the developer) wanted an Awwwards-level, mobile-first redesign with 3D on desktop. They built the 2023 site too.

## Decisions already made

Don't reopen these without asking the user.

| Topic | Decision |
|---|---|
| Framework | Next.js 16 App Router, static pages. Same stack as the user's other project at `/Users/hussy/Developer/serj`, so reuse patterns from there |
| Concept | "Through the duct": scrolling the page is air moving through a duct system. Hero = intake, services = outlets along the trunk, workshop = where ducts are made, final CTA (WhatsApp) = the outlet |
| Hero film | "Follow the air", one continuous shot scrubbed by scroll: cooler on a terrace, casing turns see-through, through the pad and fan, along the GI duct, down through an opening damper, out into a restaurant with an open kitchen and hood. Chosen by the user on 11 Oct 2026 |
| Film technique | **Prerendered frames on a 2D canvas, not live WebGL.** Same as the reference site. It looks better, works on phones and needs no three.js. This replaced the earlier "desktop-only WebGL duct" plan |
| Film scope | Chaptered spine: about 6 screens of pinned scroll with four stops (terrace, cooler, duct, room), each with one caption, then normal sections |
| Generated imagery | Blender builds geometry and camera. AI image or video models may finish shots of the story film only, and it stays labelled "3D illustration". See the rule in `AGENTS.md` |
| Tone | Mixed. Graphite sections for the hero, 3D and closing CTA; light "sheet" sections for reading and photos |
| 3D scope | Everything 3D is rendered offline and shipped as WebP frames. No WebGL anywhere yet |
| Languages | English unprefixed (`/services`), Hindi under `/hi/services`, routing in place from day one. Home and contact are fully translated; service and privacy bodies are English with a note on Hindi pages |
| Domain | The user will buy one. Until then `NEXT_PUBLIC_SITE_URL` defaults to `https://irasco.vercel.app` |
| Content | Only verified facts. Anything unconfirmed is left out or marked TODO, never guessed |

## What's built

| Area | Files | Notes |
|---|---|---|
| Config | `package.json`, `next.config.ts`, `proxy.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `.env.example` | `next.config.ts` has 308 redirects from the old Vite and Netlify URLs to the new service slugs |
| Facts and content | `app/data/business.ts`, `services.ts`, `industries.ts`, `reviews.ts`, `projects.ts` (empty on purpose), `enquiry.ts`, `site.ts` | `site.ts` builds the sitemap paths and the HVACBusiness JSON-LD |
| i18n | `app/i18n/config.ts`, `dictionaries/en.ts`, `dictionaries/hi.ts`, `LocaleProvider.tsx`, `L.tsx`, `LanguageSwitcher.tsx` | Same pattern as serj. `hi.ts` is typed against `en.ts`, so a missing key is a compile error |
| Layout | `app/[locale]/layout.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `ContactDock.tsx`, `SmoothScroll.tsx` | Fonts come from `next/font/google`. The phone-only dock keeps WhatsApp and Call pinned to the bottom |
| Home | `app/[locale]/page.tsx`, `AirflowCanvas.tsx`, `Manifesto.tsx`, `FabricationSteps.tsx`, `ServiceGlyph.tsx`, `blocks.tsx` | Sections: story film, 2D duct band with ratings, manifesto, services run, workshop film, process, reviews, closing CTA |
| Story film (web) | `app/components/story/StoryFilm.tsx`, `story/chapters.ts`, `public/story/v2/{l,p}/NNN.webp` | 150 frames per orientation (1280×720 and 540×960). Poster is the LCP; frames load after mount in coarse-to-fine passes. Timeline, caption windows and the `film` media query live in `chapters.ts` |
| Services run | `app/components/ServicesRun.tsx`, `.service-outlet` in `globals.css` | Pins and scrolls sideways along a trunk duct at `lg` and up. Plain grid elsewhere |
| Workshop film | `app/components/FabricationFilm.tsx`, `public/story/v2/fab/NNN.webp` | 60 frames, 800×600, six steps lit in order. Falls back to `FabricationSteps` |
| Hood demo | `app/components/HoodDemo.tsx` | 2D canvas particle drawing on `/services/kitchen-exhaust`: fan off, smoke spills; fan on, hood captures it. Starts off, switches on once by itself after 7 s |
| 3D source | `3d/story/*.py`, `3d/irasco-story.blend`, `3d/irasco-fabrication.blend`, `3d/AI-FINISH.md` | Fully procedural, no image textures or asset libraries. `build.py` rebuilds the scene, `render.py` renders it, `fabrication.py` does both for the workshop film |
| Frame pipeline | `scripts/encode-story.mjs`, `scripts/export-refs.mjs` | sharp turns PNG frames into WebP; `export-refs` copies the stills named in `AI-FINISH.md` |
| Pages | `services/`, `services/[slug]/`, `industries/`, `projects/`, `about/`, `contact/`, `privacy/`, `not-found.tsx`, `[...missing]/` | 32 static pages across both languages |
| Leads | `app/api/enquiry/route.ts`, `EnquiryForm.tsx` | Sends email through Resend. Without env vars it returns 503 `not_configured` and the form tells the visitor to send the same message on WhatsApp. Has a honeypot field |
| SEO | `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `app/[locale]/opengraph-image.tsx` | Canonical and hreflang (including x-default) on every page; Service JSON-LD on each service page. The share image now sits on a film frame |
| Brand | `BrandMark.tsx`, `public/brand/irasco-badge.png` | The new mark redraws the logo's hexagon and hood without the phone number. The original badge is kept for JSON-LD and the about page |

Deleted from the old site (all recoverable from `main`): `src/`, the Vite and Tailwind 3 configs, `vercel.json` (its SPA rewrite would break Next routing), 49 shadcn components (only 5 were ever used), every stock and AI image, and the Lovable uploads.

## Verify before and after your changes

```bash
npm run lint
npm run typecheck          # runs next typegen, then tsc
npm run build              # expect 32 static pages, no errors
npx next dev --port 3100   # .claude/launch.json has this as "irasco-dev"
```

Films (Blender 5.2 at `/Applications/Blender.app/Contents/MacOS/Blender`, about 25 minutes for everything on an M4 Air):

```bash
blender -b -P 3d/story/build.py -- --save 3d/irasco-story.blend
blender -b 3d/irasco-story.blend -P 3d/story/render.py -- --out 3d/renders/landscape --size 1280x720
blender -b 3d/irasco-story.blend -P 3d/story/render.py -- --out 3d/renders/portrait --size 540x960 --portrait --step 2
blender -b -P 3d/story/fabrication.py -- --out 3d/renders/fabrication --save 3d/irasco-fabrication.blend
node scripts/encode-story.mjs   # writes public/story/v2/
```

Smoke test with the dev server running:

```bash
for p in / /hi /services /services/kitchen-exhaust /hi/services/hvls-fans /industries /projects /about /contact /privacy /nope /services/commercial-air-coolers /sitemap.xml /robots.txt /en/opengraph-image; do printf "%-36s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' http://localhost:3100$p)"; done
curl -s -X POST -H 'Content-Type: application/json' -d '{"name":"Test","phone":"9826012345"}' http://localhost:3100/api/enquiry
```

Expected: 200 for pages, 404 for `/nope`, 308 for the old slug, and `{"error":"not_configured"}` with status 503 from the API when no Resend key is set.

## Next tasks, in priority order

### 0. Commit (ask first)
The user hasn't asked for a commit yet. Offer one before building on top. Commit messages end with the attribution line from the session's system instructions.

### 1. Film look development
The film is a correct, clean first pass. It is not yet photoreal.

- **AI finish (user):** `3d/AI-FINISH.md` has per-shot prompts and the ffmpeg commands that put AI frames back under the same names. Run `node scripts/export-refs.mjs` first. Recommended: AI for shots A (terrace) and F (restaurant), Blender for the see-through and duct shots.
- **Blender polish list:** town is boxes with a window shader (add balconies, wires, signage-free shopfronts); trees are blobs; restaurant floor reads pale because metals and glossy floors reflect the sky probe (bake a light-probe volume, or lower gloss); no smoke over the range yet (the amber exhaust lines exist but barely read at the final distance); cooler has no water falling over the pads; no people anywhere (deliberate, keep it that way unless the owner asks).
- **If Poly Haven is switched on** in the Blender addon preferences, swap the procedural sky for an HDRI and the plaster, tile and steel materials for scanned ones. The addon reported all libraries off on 11 Oct.
- After any re-render run `node scripts/encode-story.mjs`, then bump `VERSION` there and `STORY_VERSION` in `chapters.ts` and rename the folder under `public/story/`. Frames are cached for a year, in local browsers too, so a re-encode under the same version shows stale frames. Currently `v2`.
- If a render was interrupted, `3d/renders/` holds a mix of old and new frames. Re-run the render before encoding.

### 2. Film on the page
- **Weights:** home film 5.8 MB of frames on desktop and 2.8 MB on phones, workshop film about 1 MB. All of it loads after first paint and none of it blocks the page; the poster frame (about 50 KB) is the LCP. Keep the headline and poster as the LCP, never the canvas.
- Captions on phones cover the lower third. The portrait render lifts the subject (`--shift-y` in `render.py`), check it still feels right after any camera change.
- `StoryFilm` and `FabricationFilm` each carry their own frame loader. Fold them into one helper if a third film appears.
- Consider a live 2D particle layer over the film that reacts to scroll speed, as originally planned. `AirflowCanvas` has the particle code.

### 3. Hood demo in 3D (optional)
The 2D canvas demo ships for every device. A Blender-rendered on/off pair for desktop would match the film, but the 2D one already does the job.

### 4. Real-device check
Nothing here was tested on a physical mid-range Android phone. Check scrub smoothness, memory (150 decoded frames) and the URL-bar resize on Chrome Android before launch. If it stutters, ship every third frame on phones or cap the canvas at 1x.

### 5. Airflow calculator (blocked)
Visitor picks a space type and enters a size, gets a ballpark CMH and suggested units, and sends the result as a prefilled WhatsApp message. **Blocked until the owner signs off the formulas.** Don't invent air-change rates. The only published figure so far is in `services.ts`: one 1.5 kW cooler, up to 25,000 CMH, about 1,600 sq ft. Add the route to `staticPaths` in `site.ts` when it ships.

### 6. Polish backlog
- **Share image** (`opengraph-image.tsx`): it now sits on a film frame, but the default font still renders the headline thin. Load Archivo Bold for `ImageResponse` (needs the font file in the repo).
- **Analytics:** add Vercel Analytics plus click events for WhatsApp and Call (cookieless, so the privacy page text stays accurate).
- **Projects:** when the owner supplies jobs, fill `app/data/projects.ts`. The grid already renders when the list isn't empty. Add `/projects/[slug]` case-study pages and their sitemap entries.
- **AC service page:** it has 5 included items, which lays out 3 + 2 on desktop. Acceptable, but could be tidier.

## Blocked on the user or the owner

- **Vercel (user):** change the Framework Preset from Vite to Next.js before merging. Set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL`. Buy the domain. Update the website link on the Google Business Profile (currently irasco.vercel.app) and JustDial (currently irasco.netlify.app).
- **Owner, to confirm:** closing time (opening is 9 am, Sunday closed), full service area, wording in `services.ts`, privacy page text, calculator formulas.
- **Owner, to supply:** name and founding story; whether the "Irasco" hardware shop at 56/2B opposite Amrit Sagar Garden is the same family business; 10–15 real projects (venue, city, year, scope, site photos); written permission before showing any client name or logo; which brands they are authorised dealers for (Symphony, Mitsubishi Electric, ECOAIR and Cool-Wind appear in their posts, but dealer status is unconfirmed); workshop photos or a short video; a team photo; warranty and AMC terms; the logo source file (AI or SVG).
- **Native Hindi reader:** check `app/i18n/dictionaries/hi.ts`.

## Rules to keep

- **Never publish an unverified claim.** The 2023 site's client logos (McDonald's, KFC, Amazon, IRCTC, Hero, Mahindra) are unverified, so don't use them without the owner's written OK.
- **Reviews are verbatim.** Typos and the emoji stay. Every review needs a source.
- **No stock photos, and nothing generated passed off as real.** The story film is the single agreed exception and is labelled "3D illustration" on the page. IRASCO's real photos on JustDial (44) and Google (131+) are the owner's, but ask before downloading or reusing any of them.
- **Instagram (@irascoindia) is behind a login and age check.** Never enter credentials. If its posts are needed, ask the user to log in themselves in the browser pane.
- **Copy:** plain and specific, short sentences, real numbers. No "cutting-edge" filler.

## Gotchas learned the hard way

- **Next 16:** middleware is now `proxy.ts`, exporting `proxy`. `params` is a Promise. Type pages with the global `PageProps<"/[locale]/...">` and `LayoutProps<"/[locale]">`, which `next typegen` generates (dev and build run it automatically).
- **Root layout** is `app/[locale]/layout.tsx`; there is no `app/layout.tsx`. Unmatched URLs reach `app/[locale]/[...missing]/page.tsx`, which calls `notFound()` so the localized `not-found.tsx` (a client component using `useI18n`) renders inside the site chrome.
- **Proxy matcher** skips `/api`, `/_next` and any path with a file extension, and rewrites everything else onto `/en`. A root-level metadata route with no extension (for example `app/opengraph-image.tsx`) would get rewritten to `/en/...` and 404. Keep such files under `[locale]/`.
- **Tailwind v4 layers:** the surface classes (`surface-*`) and `.btn` live in `@layer components` so utilities like `bg-transparent` win. Unlayered CSS would beat every utility. Font tokens use `@theme inline` because they reference `next/font` variables.
- **Width animation is Latin only:** `font-stretch` works on Archivo. Devanagari falls back to IBM Plex Sans Devanagari, which has no width axis, so Hindi headings don't stretch.
- **Manifesto:** each word is measured at its final width and given a fixed box before animating the `--w` CSS variable, so lines never re-wrap mid-scroll. It re-measures on resize.
- **`next/og` (satori):** every `div` with more than one child needs `display: flex`. Use a template string for mixed text.
- **Screenshots and Lenis:** Lenis smooths scrolling, so screenshots taken right after a scroll catch mid-animation states (the header background also fades over 300 ms). Before a screenshot, jump with `window.scrollTo({ top, behavior: "instant" })` in JS and wait about 600 ms.
- **Browser pane:** `preview_start` reads `.claude/launch.json` from the session's primary working directory. If the session is rooted elsewhere, start `npx next dev --port 3100` in the background and navigate the pane to `http://localhost:3100`.
- **`film:` variant:** defined in `globals.css` as `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`. Everything pinned or scrubbed hangs off it, so no-script, reduced-motion and old browsers get plain page flow with stills. To see that fallback, load the page in an iframe with `sandbox="allow-same-origin"`.
- **Stacking with `film:`:** when a base class has a breakpoint variant (`md:pt-36`), reset it with the stacked form too (`film:pt-0 film:md:pt-0`), or the breakpoint rule wins.
- **Sticky stages use `h-lvh` for the picture and `h-svh` for captions**, so the phone URL bar never uncovers a gap or hides text.
- **Lite mode:** on Save-Data or a `2g` connection estimate the films load only their coarse passes (20 of 150 frames). The Browser pane reported `2g` on first load of the dev server, which is why the film looked steppy there. Override `Navigator.prototype.connection` and navigate away and back to test the full film.
- **Browser pane throttles `requestAnimationFrame` to about 1 fps** when it is not on screen. Scroll-driven and canvas animations look frozen or lag one step behind screenshots. Take a throwaway screenshot before the real one, or patch `requestAnimationFrame` to a timer for canvas loops.
- **A dev server may already be running** on another port (3001 on 11 Oct, started by the user). `preview_start` then fails with "another next dev server is already running": navigate the pane to that port instead of killing it.
- **Blender 5.2:** only EEVEE is listed as an engine; `action.fcurves` is gone (walk `action.layers[].strips[].channelbags[].fcurves`); the default shadow pool overflows with this many lights (`shadow_pool_size` is raised in `lighting.py`); transparent materials need `surface_render_method = "DITHERED"` and enough samples.
- **Blender MCP vs headless:** the live MCP connection dropped mid-session. Nothing depends on it: `blender -b -P 3d/story/build.py -- --save 3d/irasco-story.blend` rebuilds and `render.py` renders. Render a few frames to PNG and read them to check your work.
- **World light inside the building** is faked: the sky is full strength to the camera but its lighting contribution is keyframed down (`AMBIENT` node) once the camera is inside, because EEVEE has no baked occlusion here.
- **Harmless warnings:** the build warns that `pnpm-workspace.yaml` in the home folder was ignored (local machine only), and npm notes that the `unrs-resolver` postinstall isn't approved. Lint works either way.

## Design system quick reference

- **Colours** (`app/globals.css` `@theme`): graphite `#101418`, graphite-deep `#0b0e11`, steel `#c5cbd0`, sheet `#edf0f2`, panel `#f8f9fa`, ink `#12171c`, muted `#56616b`, IRASCO blue `#1f5fb4` (light `#74a6f0` on dark), navy `#16224a`, signal yellow `#f4c21f`. Signal yellow is only for CTAs and safety details.
- **Type:** Archivo (variable weight and width 62–125%) for display; IBM Plex Sans for text; IBM Plex Sans Devanagari for Hindi (loaded only when Devanagari glyphs appear); IBM Plex Mono for labels, units and specs.
- **Surfaces:** each section sets `surface-dark`, `surface-light`, `surface-panel` or `surface-deep`, and components read `--bg`, `--fg`, `--fg-muted`, `--line` and `--accent`.
- **Motifs:** technical drawing lines, drawing-sheet grid behind dark heroes (`DuctGrid`), shared-border card grids, numbered markers only where order is real (fabrication steps, process), yellow-and-black safety tape (`.tape`) once per page on the main CTA.

## Useful references

- **Plan page:** <https://claude.ai/artifact/2bnovj3sqGy1iGyedeXzD6>. Private to the user, so you may not be able to open it; this file covers its substance.
- **Google Maps listing:** <https://maps.google.com/?cid=15443344855444368060>
- **JustDial (HVAC listing):** <https://www.justdial.com/Ratlam/IRASCO-Shri-Sajjan-Mills-Sajjan-Mill/9999P7412-7412-180627054305-H7T3_BZDET>
- **Old sites:** <https://irasco.netlify.app/> (2023) and <https://irasco.vercel.app/>, which still deploys from `main`.
- **Sibling project with the same stack:** `/Users/hussy/Developer/serj`. See its `app/components/SmoothScroll.tsx`, `app/i18n/` and 3D components.
