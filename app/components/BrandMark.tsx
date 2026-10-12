/**
 * IRASCO mark: the hexagon and hood from the original badge, redrawn without
 * the phone number so it holds up at favicon size. The yellow bar stands in
 * for the badge's name band.
 */
export function BrandMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden="true" focusable="false">
      <path d="M16 2H48L62 28L48 54H16L2 28Z" fill="#1F5FB4" stroke="#16224A" strokeWidth="3" strokeLinejoin="round" />
      <rect x="28" y="9" width="8" height="14" fill="#fff" />
      <path d="M20 23H44L52 35H12Z" fill="#fff" />
      <rect x="12" y="35" width="40" height="3.5" fill="#fff" />
      <rect x="18" y="43" width="28" height="4" fill="#F4C21F" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.35rem] font-extrabold leading-none tracking-[0.04em] [font-stretch:118%] ${className}`}>
      IRASCO
    </span>
  );
}
