/**
 * Turn the Blender PNG frames into the WebP sequence the home page scrubs.
 *
 *   node scripts/encode-story.mjs            every set and the stills
 *   node scripts/encode-story.mjs fab        only the named sets (l, p, fab)
 *
 * Reads 3d/renders/{landscape,portrait}/f_NNNN.png (see 3d/story/render.py)
 * and writes public/story/<VERSION>/{l,p,fab}/NNN.webp plus the chapter stills.
 * Bump VERSION here and in app/components/story/chapters.ts after a re-render:
 * the frames are served with a one-year immutable cache.
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const VERSION = "v2";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/story", VERSION);

/** Every second rendered frame ships: 150 frames per orientation. */
const STEP = 2;
const SETS = [
  { name: "l", src: "3d/renders/landscape", width: 1280, height: 720, quality: 58, poster: 80 },
  { name: "p", src: "3d/renders/portrait", width: 540, height: 960, quality: 56, poster: 78 },
  // workshop film, 3d/story/fabrication.py
  { name: "fab", src: "3d/renders/fabrication", width: 800, height: 600, quality: 62, poster: 62 },
];

/** Film frames used as stills when the film itself is not shown. */
const STILLS = { terrace: 0, cooler: 104, duct: 176, room: 298 };

async function encodeSet(set) {
  const srcDir = path.join(ROOT, set.src);
  const outDir = path.join(OUT, set.name);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => /^f_\d+\.png$/.test(f)).sort();
  let bytes = 0;
  let count = 0;
  for (const file of files) {
    const frame = Number(file.slice(2, 6));
    if (frame % STEP !== 0) continue;
    const index = frame / STEP;
    const out = path.join(outDir, `${String(index).padStart(3, "0")}.webp`);
    await sharp(path.join(srcDir, file))
      .resize(set.width, set.height, { fit: "cover" })
      .webp({ quality: index === 0 ? set.poster : set.quality, effort: 5, smartSubsample: true })
      .toFile(out);
    bytes += (await stat(out)).size;
    count++;
  }
  return { count, bytes };
}

async function stills() {
  const dir = path.join(OUT, "still");
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  for (const [name, frame] of Object.entries(STILLS)) {
    const file = `f_${String(frame).padStart(4, "0")}.png`;
    await sharp(path.join(ROOT, "3d/renders/landscape", file))
      .resize(1280, 720, { fit: "cover" })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(dir, `${name}.webp`));
  }
  // share image
  await sharp(path.join(ROOT, "3d/renders/landscape", `f_${String(STILLS.cooler).padStart(4, "0")}.png`))
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(dir, "share.jpg"));
}

const only = process.argv.slice(2);

for (const set of SETS) {
  if (only.length && !only.includes(set.name)) continue;
  if (!existsSync(path.join(ROOT, set.src))) {
    console.log(`${set.name}: skipped, no frames in ${set.src}`);
    continue;
  }
  const { count, bytes } = await encodeSet(set);
  console.log(`${set.name}: ${count} frames, ${(bytes / 1e6).toFixed(2)} MB, ${(bytes / count / 1e3).toFixed(1)} KB avg`);
}
if (!only.length) await stills();
console.log(`written to ${path.relative(ROOT, OUT)}`);
