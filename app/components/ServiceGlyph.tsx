import type { GlyphKey } from "../data/services";

/**
 * Line drawings for each service, in the same technical-drawing language as
 * the hero. Equipment is drawn in the text colour; air is drawn in the
 * section's accent colour. These stand in until real site photos and the
 * Blender renders arrive.
 */

/** A straight arrow from (x1,y1) to (x2,y2) with an open head. */
function arrow(x1: number, y1: number, x2: number, y2: number, head = 6) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h1 = [x2 - head * Math.cos(a - 0.5), y2 - head * Math.sin(a - 0.5)];
  const h2 = [x2 - head * Math.cos(a + 0.5), y2 - head * Math.sin(a + 0.5)];
  const r = (n: number) => Math.round(n * 10) / 10;
  return `M${x1} ${y1}L${x2} ${y2}M${r(h1[0])} ${r(h1[1])}L${x2} ${y2}L${r(h2[0])} ${r(h2[1])}`;
}

function Air({ d }: { d: string }) {
  return <path d={d} stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />;
}

const drawings: Record<GlyphKey, React.ReactNode> = {
  duct: (
    <>
      <path d="M10 100H128Q160 100 160 68V14M10 70H112Q130 70 130 52V14M10 70V100M130 14H160" />
      <path d="M46 65V105M86 65V105M125 38H165" strokeWidth="2.2" />
      <path d="M18 108H58M18 104V112M58 104V112" opacity=".55" />
      <Air d={arrow(22, 85, 70, 85)} />
      <Air d={`M84 85H104Q145 85 145 50`} />
      <Air d={arrow(145, 52, 145, 24)} />
    </>
  ),
  hood: (
    <>
      <rect x="88" y="8" width="24" height="40" />
      <path d="M60 48H140L170 90H30Z" />
      <rect x="30" y="90" width="140" height="6" />
      <path d="M58 86L66 70M74 86L82 70M90 86L98 70M106 86L114 70M122 86L130 70M138 86L146 70" opacity=".6" />
      <rect x="44" y="120" width="112" height="12" />
      <path d="M62 120V116H82V120M118 120V116H138V120" />
      <Air d="M70 113c-7-6 7-10 0-16s7-10 0-14" />
      <Air d="M100 113c-7-6 7-10 0-16s7-10 0-14" />
      <Air d="M130 113c-7-6 7-10 0-16s7-10 0-14" />
      <Air d={arrow(100, 40, 100, 14)} />
    </>
  ),
  ac: (
    <>
      <rect x="18" y="16" width="112" height="34" rx="5" />
      <path d="M28 42H120" />
      <circle cx="118" cy="26" r="2" />
      <rect x="122" y="74" width="64" height="54" />
      <circle cx="148" cy="101" r="18" />
      <path d="M148 83V119M130 101H166" opacity=".6" />
      <path d="M174 82V120M180 82V120" opacity=".6" />
      <path d="M130 30H150V74M130 36H144V74" />
      <Air d="M40 56q8 12 0 26" />
      <Air d="M70 56q8 12 0 26" />
      <Air d="M100 56q8 12 0 26" />
    </>
  ),
  cooler: (
    <>
      <rect x="50" y="44" width="100" height="84" />
      <path d="M60 58H140M60 66H140M60 74H140M60 82H140M60 90H140M60 98H140M60 106H140" opacity=".55" />
      <path d="M50 118H150" />
      <path d="M80 44V10M120 44V10M76 24H124M76 10H124" />
      <Air d={arrow(100, 40, 100, 14)} />
      <Air d={arrow(22, 80, 46, 80)} />
      <Air d={arrow(22, 100, 46, 100)} />
    </>
  ),
  hvls: (
    <>
      <path d="M10 14H190" />
      <path d="M20 14l-6-6M40 14l-6-6M60 14l-6-6M140 14l-6-6M160 14l-6-6M180 14l-6-6" opacity=".45" />
      <path d="M100 14V40" />
      <circle cx="100" cy="44" r="6" />
      <path d="M94 43L16 50V55L94 48ZM106 43L184 50V55L106 48Z" />
      <path d="M97 49L90 66H96L101 50" />
      <path d="M10 132H190" />
      <Air d={arrow(50, 70, 50, 122)} />
      <Air d={arrow(100, 76, 100, 122)} />
      <Air d={arrow(150, 70, 150, 122)} />
    </>
  ),
  ventilation: (
    <>
      <path d="M10 126L100 96L190 126" />
      <rect x="88" y="72" width="24" height="26" />
      <path d="M74 72Q74 34 100 30Q126 34 126 72Z" />
      <path d="M82 72Q84 46 100 30M91 72Q92 48 100 30M109 72Q108 48 100 30M118 72Q116 46 100 30" opacity=".6" />
      <path d="M74 72H126" strokeWidth="2.2" />
      <Air d={arrow(100, 26, 100, 6)} />
      <Air d="M64 60q-14-8-10-26" />
      <Air d="M136 60q14-8 10-26" />
    </>
  ),
};

export default function ServiceGlyph({ glyph, className = "" }: { glyph: GlyphKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {drawings[glyph]}
    </svg>
  );
}
