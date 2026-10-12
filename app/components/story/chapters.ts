/**
 * Timeline of the "Follow the air" film.
 *
 * The frames come from Blender (`3d/story/camera.py`) and are encoded by
 * `scripts/encode-story.mjs`. Every second rendered frame ships, so shipped
 * frame i is film frame i * 2. Change the three files together.
 */

/** Bump after a re-render: the frames are cached for a year. */
export const STORY_VERSION = "v2";
export const FRAME_COUNT = 150;

/** Landscape frames are 1280x720, portrait frames 540x960. */
export type FrameSet = "l" | "p";
export const FRAME_SIZE: Record<FrameSet, [number, number]> = { l: [1280, 720], p: [540, 960] };

export function frameSrc(set: FrameSet, index: number) {
  return `/story/${STORY_VERSION}/${set}/${String(index).padStart(3, "0")}.webp`;
}

export type ChapterId = "terrace" | "cooler" | "duct" | "room";

export function stillSrc(id: ChapterId) {
  return `/story/${STORY_VERSION}/still/${id}.webp`;
}

/**
 * The film only plays where the browser can run scripts and the visitor has
 * not asked for less motion. Everyone else (and any browser too old to know
 * the `scripting` media feature) gets the same story as stills in page flow.
 * Mirrors the `film` variant in globals.css.
 */
export const FILM_QUERY = "(scripting: enabled) and (prefers-reduced-motion: no-preference)";

/**
 * Scroll progress through the pinned section (0..1) to shipped frame.
 * Flat stretches are where a caption is on screen, so the picture slows down
 * and gives the visitor time to read.
 */
const TIMELINE: [number, number][] = [
  [0.0, 0],
  [0.15, 31], // terrace push-in
  [0.23, 46], // casing turns see-through
  [0.4, 61], // hold on the open cooler
  [0.48, 75], // through the pad and the fan
  [0.66, 100], // along the duct
  [0.76, 118], // down the drop, damper opens
  [0.9, 149], // pull back into the room
  [1.0, 149],
];

export function frameAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < TIMELINE.length - 1; i++) {
    const [p0, f0] = TIMELINE[i];
    const [p1, f1] = TIMELINE[i + 1];
    if (p <= p1) return f0 + ((p - p0) / (p1 - p0)) * (f1 - f0);
  }
  return FRAME_COUNT - 1;
}

/** When each caption is on screen: fade in from a to b, hold, fade out from c to d. */
export const CAPTION_WINDOWS: Record<"hero" | Exclude<ChapterId, "terrace">, [number, number, number, number]> = {
  hero: [-1, -1, 0.04, 0.1],
  cooler: [0.24, 0.28, 0.375, 0.415],
  duct: [0.5, 0.54, 0.615, 0.655],
  room: [0.8, 0.85, 2, 2],
};

/** Where the live air streaks play: the flight along the duct. */
export const WIND_WINDOW: [number, number, number, number] = [0.47, 0.5, 0.68, 0.73];

/** Progress range of each chapter on the rail. */
export const RAIL: [ChapterId, number, number][] = [
  ["terrace", 0, 0.16],
  ["cooler", 0.16, 0.44],
  ["duct", 0.44, 0.74],
  ["room", 0.74, 1],
];

export function windowValue(p: number, [a, b, c, d]: [number, number, number, number]) {
  if (p <= a) return a === b ? 1 : 0;
  if (p < b) return (p - a) / (b - a);
  if (p <= c) return 1;
  if (p < d) return 1 - (p - c) / (d - c);
  return 0;
}
