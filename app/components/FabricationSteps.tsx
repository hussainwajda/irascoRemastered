/**
 * The six steps from flat sheet to finished duct, drawn as small elevations.
 * Order is the real fabrication order, so the numbers carry meaning.
 */
const STEP_DRAWINGS = [
  // Sheet
  <path key="sheet" d="M8 30L28 20L56 30L36 40Z" />,
  // Cut: sheet with a dashed cut line
  <g key="cut">
    <path d="M8 30L28 20L56 30L36 40Z" />
    <path d="M18 25L46 35" strokeDasharray="3 3" stroke="var(--accent)" />
  </g>,
  // Fold: an L-profile
  <path key="fold" d="M10 40V18L30 10V32ZM30 32L54 40L34 48L10 40" />,
  // Seam: two edges hooked together (Pittsburgh lock)
  <path key="seam" d="M6 34H26V24H34V36H30V28M34 36H58" />,
  // Flange: duct section with flange lips
  <g key="flange">
    <rect x="16" y="14" width="32" height="24" />
    <path d="M12 10H52M12 42H52M12 10V42M52 10V42" strokeWidth="2" />
  </g>,
  // Insulate: duct section wrapped in an outer layer
  <g key="insulate">
    <rect x="18" y="16" width="28" height="20" />
    <rect x="12" y="10" width="40" height="32" stroke="var(--accent)" />
    <path d="M12 16l6-6M12 24l14-14M12 32l22-22M12 40l30-30M20 42l32-32M28 42l24-24M36 42l16-16M44 42l8-8" stroke="var(--accent)" opacity=".4" />
  </g>,
];

export default function FabricationSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="grid grid-cols-2 border-l border-t border-(--line) sm:grid-cols-3 lg:grid-cols-6">
      {steps.map((step, i) => (
        <li key={step} className="grid gap-4 border-b border-r border-(--line) p-5">
          <span className="font-mono text-xs text-(--fg-muted)">{String(i + 1).padStart(2, "0")}</span>
          <svg viewBox="0 0 64 52" className="h-14 w-auto" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
            {STEP_DRAWINGS[i]}
          </svg>
          <span className="font-semibold">{step}</span>
        </li>
      ))}
    </ol>
  );
}
