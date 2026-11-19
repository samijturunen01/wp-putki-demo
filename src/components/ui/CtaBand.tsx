import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { quoteHref } from '../../data/nav'
import type { RequestKind } from '../../lib/forms/types'
import type { ServiceId } from '../../data/services'
import { track } from '../../lib/analytics'

interface Props {
  title: ReactNode
  text: ReactNode
  cta?: string
  kind?: RequestKind
  area?: ServiceId
  location: string
}

/** Closing call to action: one primary action (request) + the work-order phone line. */
export function CtaBand({ title, text, cta = 'Pyydä tarjous', kind, area, location }: Props) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-white" aria-label="Yhteydenotto">
      <div className="blueprint absolute inset-0 opacity-70" aria-hidden="true" />
      {/* Flow line crossing the band */}
      <svg aria-hidden="true" className="absolute inset-x-0 top-1/2 hidden h-24 w-full -translate-y-1/2 lg:block" preserveAspectRatio="none" viewBox="0 0 1200 96">
        <path d="M0 70 H760 Q800 70 800 30 V26 Q800 14 812 14 H1200" fill="none" stroke="#05AEF0" strokeOpacity="0.28" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container-x relative grid gap-8 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
        <div data-reveal>
          <h2 className="display-l max-w-[18ch]">{title}</h2>
          <div className="lead mt-5 max-w-[36rem] text-fog">{text}</div>
        </div>
        <div className="flex flex-col gap-3 lg:items-end" data-reveal style={{ ['--d' as string]: 120 }}>
          <Link
            to={quoteHref(kind, area)}
            onClick={() => track('cta_click', { location, label: kind ?? 'pyyda_tarjous' })}
            className="btn btn-primary w-full sm:w-auto sm:!px-8"
          >
            {cta}
          </Link>
          <a href={company.phone.href} onClick={() => track('phone_click', { location })} className="btn btn-outline w-full text-white sm:w-auto">
            <Phone size={18} aria-hidden="true" /> Soita työtilaus <span className="num">{company.phone.display}</span>
          </a>
          <p className="flex items-center gap-2 text-[0.93rem] text-fog">
            <Clock size={15} aria-hidden="true" className="text-flow" /> Arkisin 7.00–15.30
          </p>
        </div>
      </div>
    </section>
  )
}
