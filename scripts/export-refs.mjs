/**
 * Copy the frames named in 3d/AI-FINISH.md into 3d/renders/refs/, so they are
 * easy to find and upload as start, end or structure images.
 *
 *   node scripts/export-refs.mjs
 */
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "3d/renders/refs");

const REFS = {
  A_start: 0,
  A_end: 62,
  B_hold: 104,
  C_fan: 140,
  D_duct: 176,
  E_damper: 224,
  F_start: 236,
  F_end: 299,
};

const name = (frame) => `f_${String(frame).padStart(4, "0")}.png`;

await mkdir(path.join(OUT, "portrait"), { recursive: true });
for (const [label, frame] of Object.entries(REFS)) {
  await copyFile(path.join(ROOT, "3d/renders/landscape", name(frame)), path.join(OUT, `${label}_${name(frame)}`));
  // portrait is rendered on even frames only
  const even = frame - (frame % 2);
  await copyFile(path.join(ROOT, "3d/renders/portrait", name(even)), path.join(OUT, "portrait", `${label}_${name(even)}`));
}
console.log(`reference frames written to ${path.relative(ROOT, OUT)}`);
