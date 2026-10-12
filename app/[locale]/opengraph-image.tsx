import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "../data/business";
import { STORY_VERSION } from "../components/story/chapters";

// The see-through cooler frame from the home page film (scripts/encode-story.mjs).
const still = await readFile(join(process.cwd(), "public/story", STORY_VERSION, "still/share.jpg"), "base64");
const stillSrc = `data:image/jpeg;base64,${still}`;

export const alt = "IRASCO · Ducting, kitchen exhaust and cooling in Ratlam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card for WhatsApp, Facebook and search. English on both locales:
 * the default image font has no Devanagari. The picture is a frame of the
 * Blender-built film, a 3D illustration and not a site photo.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: "#101418",
          color: "#e4e9ed",
          padding: "64px 72px 0",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text -- satori markup, not the DOM */}
        <img src={stillSrc} width={1200} height={630} style={{ position: "absolute", left: 0, top: 0 }} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(180deg, rgba(11,14,17,0.82) 0%, rgba(11,14,17,0.25) 38%, rgba(11,14,17,0.92) 82%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
          <svg width="84" height="74" viewBox="0 0 64 56">
            <path d="M16 2H48L62 28L48 54H16L2 28Z" fill="#1F5FB4" stroke="#16224A" strokeWidth="3" />
            <rect x="28" y="9" width="8" height="14" fill="#fff" />
            <path d="M20 23H44L52 35H12Z" fill="#fff" />
            <rect x="12" y="35" width="40" height="3.5" fill="#fff" />
            <rect x="18" y="43" width="28" height="4" fill="#F4C21F" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>IRASCO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "relative" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -2, maxWidth: 960 }}>
            Ducting, kitchen exhaust & cooling.
          </div>
          <div style={{ fontSize: 30, color: "#c5cbd0" }}>
            {`Fabricated in Ratlam since ${business.foundedYear} · ${business.phone.display}`}
          </div>
        </div>
        <div
          style={{
            height: 28,
            margin: "0 -72px",
            position: "relative",
            backgroundImage: "repeating-linear-gradient(-45deg, #F4C21F 0 18px, #12171C 18px 36px)",
          }}
        />
      </div>
    ),
    size,
  );
}
