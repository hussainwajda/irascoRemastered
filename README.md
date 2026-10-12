# IRASCO website

Website for IRASCO, a ducting and ventilation contractor in Sajjan Mill, Ratlam (since 2017).
Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, Lenis + GSAP. English and Hindi.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

Copy `.env.example` to `.env.local` and fill it in. Without `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL`
the contact form still works for visitors: it tells them to send the same message on WhatsApp.

## Structure

```
app/
  [locale]/            every page, rendered for en and hi
    page.tsx           home: story film, manifesto, services run, workshop film, process, reviews, CTA
    services/          index + [slug] for the six services
    industries/ projects/ about/ contact/ privacy/
    opengraph-image.tsx  share card
  api/enquiry/         contact form → email via Resend
  components/          header, footer, contact dock, airflow canvas, glyphs, form, hood demo
    story/             the scroll film and its timeline (chapters.ts)
  data/                business facts, services, industries, reviews, projects (the only source of facts)
  i18n/                locale config, dictionaries (en, hi), locale-aware links
  sitemap.ts robots.ts icon.svg
proxy.ts               serves English unprefixed and Hindi under /hi
next.config.ts         301s from the old Vite and Netlify URLs, long cache for film frames
3d/story/              Blender scene as Python: build.py, render.py, fabrication.py
3d/AI-FINISH.md        prompts for finishing film shots with AI models
scripts/               encode-story.mjs (PNG frames to WebP), export-refs.mjs
public/story/v2/       the encoded film frames and stills
```

## Before launch

- [ ] Vercel: change the project's **Framework Preset from Vite to Next.js** (the old project built `dist/`).
- [ ] Vercel env: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, optional `ENQUIRY_TO_EMAIL`.
- [ ] Domain and a business email on it; update `NEXT_PUBLIC_SITE_URL`.
- [ ] Update the website link on Google Business Profile (now irasco.vercel.app) and JustDial (now irasco.netlify.app).
- [ ] Owner to confirm: closing time, full service area, service descriptions in `app/data/services.ts`, privacy page text.
- [ ] Native Hindi speaker to read `app/i18n/dictionaries/hi.ts`.
- [ ] Real projects with site photos in `app/data/projects.ts` (the projects page links out to Google/JustDial photos until then).

## The films

The home page opens with a 3D illustration, rendered in Blender and scrubbed by scroll. To change it,
edit the Python under `3d/story/`, re-render and re-encode (Blender 5.2, about 25 minutes on an M4 Air):

```bash
BLENDER=/Applications/Blender.app/Contents/MacOS/Blender
$BLENDER -b -P 3d/story/build.py -- --save 3d/irasco-story.blend
$BLENDER -b 3d/irasco-story.blend -P 3d/story/render.py -- --out 3d/renders/landscape --size 1280x720
$BLENDER -b 3d/irasco-story.blend -P 3d/story/render.py -- --out 3d/renders/portrait --size 540x960 --portrait --step 2
$BLENDER -b -P 3d/story/fabrication.py -- --out 3d/renders/fabrication
node scripts/encode-story.mjs
```

`3d/renders/` is not in git. Visitors with scripts off, reduced motion or an old browser get the same
content as stills in normal page flow.

## Next phases

- Film look development: AI finish of the terrace and restaurant shots (`3d/AI-FINISH.md`), Blender polish list in `HANDOFF.md`.
- Real-device check of the films on a mid-range Android phone.
- Airflow calculator (formulas signed off by the owner).
