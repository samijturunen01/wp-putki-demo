import { ExternalLink } from 'lucide-react'
import { feedback, maps } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Customer feedback as published on the current wp-putki.fi (anonymous "Asiakas").
 * No star rating is shown: none could be verified. Visitors can read the reviews on Google.
 */
export function Feedback({ dark = true }: { dark?: boolean }) {
  return (
    <div>
      <ul className="grid gap-px overflow-hidden rounded-[26px] bg-white/10 lg:grid-cols-3">
        {feedback.map((f, i) => (
          <li key={f.quote} className={`relative flex flex-col justify-between gap-8 p-7 sm:p-9 ${dark ? 'bg-ink-2' : 'bg-white'}`} data-reveal style={{ ['--d' as string]: 90 * i }}>
            <span aria-hidden="true" className="font-display text-[3.4rem] leading-[0.6] text-flow">
              ”
            </span>
            <blockquote className={`display-s !font-[500] !leading-[1.35] ${dark ? 'text-white' : 'text-graphite'}`}>
              <p>{f.quote}</p>
            </blockquote>
            <p className={`tag ${dark ? 'text-fog' : 'text-steel'}`}>— Asiakas</p>
          </li>
        ))}
      </ul>
      <div className={`mt-6 flex flex-col gap-3 text-[0.92rem] sm:flex-row sm:items-center sm:justify-between ${dark ? 'text-fog' : 'text-steel'}`}>
        <p>Palautteet on lainattu sellaisinaan WP-Putken nykyiseltä verkkosivustolta.</p>
        <a
          href={maps.reviews}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('reviews_click', { location: 'feedback' })}
          className={`inline-flex shrink-0 items-center gap-2 font-[650] ${dark ? 'text-white hover:text-flow-lite' : 'text-graphite hover:text-flow-deep'}`}
        >
          Lue arviot Googlessa <ExternalLink size={16} aria-hidden="true" />
          <span className="sr-only">(avautuu uuteen välilehteen)</span>
        </a>
      </div>
    </div>
  )
}
