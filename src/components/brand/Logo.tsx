import L from './logo.json'

interface LogoProps {
  className?: string
  /** Colour of "PUTKI" and the indicator pill: white on dark surfaces (original), ink on light. */
  text?: 'light' | 'dark'
  /** Accessible name; omit when the surrounding link already names the logo. */
  title?: string
}

/**
 * The authentic WP-Putki logo, recreated as vector strokes from the original artwork
 * (one continuous line per letter, cyan #05AEF0, rounded "PUTKI"). See logo.json.
 */
export function Logo({ className, text = 'light', title }: LogoProps) {
  const ink = text === 'light' ? '#ffffff' : '#061018'
  return (
    <svg
      viewBox={L.viewBox}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="none" stroke={L.cyan} strokeWidth={L.markStroke} strokeLinecap="round" strokeLinejoin="round">
        <path d={L.W} />
        <path d={L.P} />
      </g>
      <path d={L.pill} stroke={ink} strokeWidth={L.pillStroke} strokeLinecap="round" />
      <g fill="none" stroke={ink} strokeWidth={L.textStroke} strokeLinecap="round" strokeLinejoin="round">
        {L.putki.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  )
}
