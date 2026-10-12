<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# IRASCO site rules

- **Continuing the rebuild? Read `HANDOFF.md` first.** It has the current state, decisions, next tasks and gotchas.
- **Facts come from `app/data/`, nowhere else.** `business.ts` holds every verified fact about IRASCO (checked against Google Maps, JustDial and IRASCO's own posts). Never add a number, certification, warranty, client name or spec that isn't sourced there or confirmed by the owner. The previous site was full of invented content; don't reintroduce it.
- **Reviews are quoted verbatim** in `app/data/reviews.ts`, with source. Don't edit their wording.
- **i18n**: English is unprefixed, Hindi lives under `/hi` (see `proxy.ts` and `app/i18n/config.ts`). `hi.ts` is typed against `en.ts`. Link internally with `L` (server) or `useI18n().href` (client).
- **Design tokens** live in `app/globals.css` (`@theme`). Sections pick a surface class (`surface-dark`, `surface-light`, `surface-panel`, `surface-deep`) and components read `--bg`, `--fg`, `--fg-muted`, `--line`, `--accent`.
- **No stock photos, and nothing generated passed off as real.** Anything shown as IRASCO's work, workshop or team must be a real photo under `public/projects/`, or a line drawing from `ServiceGlyph.tsx`. The one exception, agreed with the owner's developer on 11 Oct 2026, is the home page story film under `public/story/`: a Blender-built 3D illustration (`3d/story/`) that may be finished with AI image or video models (`3d/AI-FINISH.md`). It must keep its "3D illustration" label, and AI imagery stays out of everything else.
