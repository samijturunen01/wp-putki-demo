import { useEffect, useRef } from 'react'
import L from '../brand/logo.json'
import { gsap } from '../../lib/motion'
import { introAllowed, releaseIntroHold } from '../../lib/intro'

/**
 * Signature intro – "Painekoe" (pressure test).
 * The authentic WP mark is one continuous pipe run: the W is laid with a bright flow front,
 * the P closes its loop, the white indicator in the P lights up like a gauge passing the test,
 * PUTKI is drawn and one pulse of water runs through the whole line. ≈2.8 s, never blocks the
 * page: the headline and CTAs next to it are readable and clickable from the first paint.
 *
 * Plays on every full load / refresh of the homepage (no storage), not after in-app navigation,
 * never with reduced motion. State is exposed as data-intro on .hero-stage for tests.
 */
export function HeroMark() {
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = root.current
    const stage = svg?.closest<HTMLElement>('.hero-stage')
    if (!svg || !stage) return
    if (!introAllowed()) {
      stage.dataset.intro = 'skipped'
      releaseIntroHold()
      return
    }

    const q = <T extends Element>(sel: string) => Array.from(svg.querySelectorAll<T>(sel))
    const [wLine, pLine] = q<SVGPathElement>('.mark-main')
    const [wFront, pFront] = q<SVGPathElement>('.mark-front')
    const [wPulse, pPulse] = q<SVGPathElement>('.mark-pulse')
    const letters = q<SVGPathElement>('.mark-letter')
    const pill = svg.querySelector<SVGPathElement>('.mark-pill')!
    const glow = svg.querySelector<SVGCircleElement>('.mark-glow')!
    const notes = q<SVGElement>('.mark-note')

    // Draw a line with a bright front riding on its leading edge (dash 0.06 of pathLength 1).
    const lay = (line: SVGPathElement, front: SVGPathElement, duration: number) => {
      const s = { p: 0 }
      return gsap.to(s, {
        p: 1,
        duration,
        ease: 'power2.inOut',
        onStart: () => gsap.set(front, { opacity: 1 }),
        onUpdate: () => {
          line.style.strokeDashoffset = String(1 - s.p)
          front.style.strokeDashoffset = String(0.06 - s.p)
        },
        onComplete: () => gsap.to(front, { opacity: 0, duration: 0.25 }),
      })
    }
    const pulse = (path: SVGPathElement, duration: number) => {
      const s = { p: 0 }
      return gsap.to(s, {
        p: 1.06,
        duration,
        ease: 'power1.inOut',
        onStart: () => gsap.set(path, { opacity: 1 }),
        onUpdate: () => {
          path.style.strokeDashoffset = String(0.06 - s.p)
        },
        onComplete: () => gsap.set(path, { opacity: 0 }),
      })
    }

    const ctx = gsap.context(() => {
      // Inline start state first, then release the pre-paint CSS hold → no flash.
      gsap.set([wLine, pLine, ...letters], { strokeDashoffset: 1 })
      gsap.set([pill, glow, ...notes], { opacity: 0 })
      gsap.set(pill, { scale: 0.3, transformOrigin: '50% 50%' })
      gsap.set(glow, { scale: 0.4, transformOrigin: '50% 50%' })
      releaseIntroHold()
      stage.dataset.intro = 'playing'

      const tl = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          stage.dataset.intro = 'done'
        },
      })
      tl.add(lay(wLine, wFront, 1.25), 0)
        .add(lay(pLine, pFront, 1.15), 0.42)
        .to(letters, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 }, 1.05)
        .to(pill, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.4)' }, 1.55)
        .to(glow, { opacity: 0.9, scale: 1, duration: 0.3, ease: 'power2.out' }, 1.55)
        .to(glow, { opacity: 0, scale: 2.4, duration: 0.7, ease: 'power2.out' }, 1.85)
        .to(notes, { opacity: 1, duration: 0.6, ease: 'power1.out', stagger: 0.08 }, 1.7)
        .add(pulse(wPulse, 0.95), 1.95)
        .add(pulse(pPulse, 0.85), 2.2)
    }, svg)

    return () => {
      ctx.revert()
      // StrictMode re-runs effects in development: keep the final drawing visible.
      if (stage.dataset.intro === 'playing') stage.dataset.intro = 'done'
    }
  }, [])

  const stroke = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

  return (
    <svg
      ref={root}
      viewBox="20 62 474 386"
      className="hero-mark block h-auto w-full overflow-visible"
      role="img"
      aria-label="WP-Putken logo piirtyy yhtenä putkilinjana"
    >
      <defs>
        <radialGradient id="mark-halo" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#05AEF0" stopOpacity="0.16" />
          <stop offset="1" stopColor="#05AEF0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="257" cy="230" rx="240" ry="190" fill="url(#mark-halo)" />

      {/* Drafting frame and annotations */}
      <g className="mark-note" fill="none" stroke="#6fd3fb" strokeOpacity="0.45" strokeWidth="1.2">
        <path d="M30 92 V72 H50 M484 92 V72 H464 M30 418 V438 H50 M484 418 V438 H464" />
      </g>
      <g className="mark-note" fill="#a3b4c2" fontFamily="'Geist Mono Variable', ui-monospace, monospace" fontSize="10.5" letterSpacing="1.6">
        <text x="58" y="86">WP-PUTKI OY</text>
        <text x="456" y="86" textAnchor="end">
          JOENSUU · 1989
        </text>
      </g>
      <g className="mark-note" stroke="#6fd3fb" strokeOpacity="0.5" strokeWidth="1.2" fill="none">
        {/* Dimension line under PUTKI */}
        <path d="M78 424 H436 M78 418 V430 M436 418 V430" />
      </g>
      <g className="mark-note" fill="#a3b4c2" fontFamily="'Geist Mono Variable', ui-monospace, monospace" fontSize="10.5" letterSpacing="1.6">
        <text x="257" y="444" textAnchor="middle">
          LÄMPÖ · VESI · ILMA · ASBESTI
        </text>
      </g>

      {/* The mark */}
      <g {...stroke} stroke={L.cyan} strokeWidth={L.markStroke}>
        <path className="mark-line mark-main" d={L.W} pathLength={1} />
        <path className="mark-line mark-main" d={L.P} pathLength={1} />
      </g>
      {/* Flow front (leading edge while drawing) and the single water pulse */}
      <g {...stroke} stroke="#e9fbff" strokeWidth={L.markStroke * 0.62}>
        <path className="mark-front" d={L.W} pathLength={1} />
        <path className="mark-front" d={L.P} pathLength={1} />
        <path className="mark-pulse" d={L.W} pathLength={1} />
        <path className="mark-pulse" d={L.P} pathLength={1} />
      </g>
      <circle className="mark-glow" cx="355" cy="166" r="14" fill="none" stroke="#e9fbff" strokeWidth="2.5" />
      <path className="mark-pill" d={L.pill} stroke="#ffffff" strokeWidth={L.pillStroke} strokeLinecap="round" />
      <g {...stroke} stroke="#ffffff" strokeWidth={L.textStroke}>
        {L.putki.map((d) => (
          <path key={d} className="mark-line mark-letter" d={d} pathLength={1} />
        ))}
      </g>
    </svg>
  )
}
