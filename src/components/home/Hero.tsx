import { Link } from 'react-router-dom'
import { Clock, Phone } from 'lucide-react'
import { HeroMark } from './HeroMark'
import { company } from '../../data/company'
import { quoteHref } from '../../data/nav'
import { track } from '../../lib/analytics'

const facts = [
  { k: `Vuodesta ${company.foundedYear}`, v: 'Joensuulainen LVI-liike – kokemusta yli kolme vuosikymmentä.' },
  { k: 'Neljä linjaa', v: 'Lämpö, vesi, ilma ja asbesti – kartoituksesta purkuun ja uusiin putkiin.' },
  { k: 'Suorat numerot', v: 'Urakkalaskenta, asbestityöt ja laskutus: tiedät, kenelle soitat.' },
  { k: 'Käpykangas', v: 'Toimipiste ja oma autokalusto osoitteessa Ukkolantie 25.' },
]

export function Hero() {
  return (
    <section className="hero-stage on-dark blueprint relative overflow-hidden bg-ink text-white" data-intro="idle" aria-labelledby="hero-title">
      <div className="container-x relative grid items-center gap-8 pb-12 pt-8 sm:pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14 lg:pb-20 lg:pt-20">
        <div className="order-2 lg:order-1">
          <p className="tag flex items-center gap-3 text-flow-lite">
            <span className="valve !h-[8px] !w-[11px] text-flow" aria-hidden="true" />
            LVI-urakointi ja -huolto · Joensuu
          </p>
          <h1 id="hero-title" className="display-xl mt-5 max-w-[15ch]">
            LVI-työt Joensuussa – <span className="text-flow">varmasti linjassaan.</span>
          </h1>
          <p className="lead mt-6 max-w-[38rem] text-fog">
            Asennamme, saneeraamme ja huollamme rakennusten lämpö-, vesi- ja ilmanvaihtotekniikan sekä teemme asbesti- ja haitta-ainekartoitukset ja
            -purut. Taloyhtiöille, yrityksille ja kotitalouksille – vuodesta {company.foundedYear}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to={quoteHref()}
              onClick={() => track('cta_click', { location: 'hero', label: 'pyyda_tarjous' })}
              className="btn btn-primary sm:!px-7"
            >
              Pyydä tarjous
              <span className="go" aria-hidden="true">
                <span className="go-line !w-[18px]" />
              </span>
            </Link>
            <a href={company.phone.href} onClick={() => track('phone_click', { location: 'hero' })} className="btn btn-outline text-white">
              <Phone size={18} aria-hidden="true" />
              Soita työtilaus <span className="num">{company.phone.display}</span>
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-[0.95rem] text-fog">
            <Clock size={16} aria-hidden="true" className="text-flow" />
            Työtilausten vastaanotto arkisin 7.00–15.30
          </p>
        </div>

        <div className="hero-frame order-1 mx-auto w-full max-w-[220px] sm:max-w-[340px] lg:order-2 lg:max-w-[520px]">
          <HeroMark />
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink/60">
        <ul className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <li key={f.k} className="relative py-5 pr-4 sm:py-6 lg:pl-6 lg:first:pl-0" data-reveal style={{ ['--d' as string]: 80 * i }}>
              {i > 0 && <span aria-hidden="true" className="absolute left-0 top-6 hidden h-[calc(100%-3rem)] w-px bg-white/10 lg:block" />}
              <p className="font-display text-[1.02rem] font-[600] tracking-[-0.02em] text-white">{f.k}</p>
              <p className="mt-1.5 text-[0.93rem] leading-snug text-fog">{f.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
