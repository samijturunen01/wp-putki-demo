import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Phone } from 'lucide-react'
import { company, person, type Person } from '../../data/company'
import { quoteHref } from '../../data/nav'
import type { RequestKind } from '../../lib/forms/types'
import { PersonCard } from '../ui/PersonCard'
import { track } from '../../lib/analytics'

interface Route {
  id: string
  label: string
  hint: string
  title: string
  text: string
  people: Person['id'][]
  orders?: boolean
  cta?: { label: string; kind: RequestKind }
}

/** Contact areas exactly as published on wp-putki.fi/yhteystiedot. */
const routesList: Route[] = [
  {
    id: 'huolto',
    label: 'Vika, vuoto tai huoltotarve',
    hint: 'Hana, WC, patteri, IV-kone',
    title: 'Soita työtilaus – tai jätä se lomakkeella',
    text: 'Pienet korjaus- ja huoltotyöt tilataan helpoimmin puhelimella. Kerro kohde, vika ja yhteystietosi.',
    people: [],
    orders: true,
    cta: { label: 'Jätä työtilaus lomakkeella', kind: 'huolto' },
  },
  {
    id: 'urakka',
    label: 'Urakka tai saneeraus',
    hint: 'Linjasaneeraus, lämmönjako, IV-urakka',
    title: 'Urakkalaskenta ja työnjohto',
    text: 'Taloyhtiöiden ja yritysten urakat, saneeraukset ja IV-työt. Lähetä tarjouspyyntö tai soita suoraan.',
    people: ['arto', 'tuomas'],
    cta: { label: 'Pyydä urakkatarjous', kind: 'urakka' },
  },
  {
    id: 'asbesti',
    label: 'Asbesti tai haitta-aineet',
    hint: 'Kartoitus ennen remonttia, purkutyöt',
    title: 'Asbestikartoitus ja -purku',
    text: 'Kartoitukset ja purkutyöt ennen remonttia tai linjasaneerausta – ja samalta yritykseltä remontin LVI-työt.',
    people: ['mika'],
    cta: { label: 'Pyydä tarjous kartoituksesta', kind: 'asbesti' },
  },
  {
    id: 'myymala',
    label: 'Myymälä ja tiliasiakkuus',
    hint: 'LVI-tarvikkeet tiliasiakkaille',
    title: 'Myymälä palvelee tiliasiakkaita',
    text: `${company.storeNote} ${company.hours.store}, ${company.address.street}.`,
    people: ['tuomas'],
  },
  {
    id: 'laskutus',
    label: 'Laskutus',
    hint: 'Laskut ja myyntireskontra',
    title: 'Laskutus ja myyntireskontra',
    text: 'Kysymykset laskuista ja maksuista. Verkkolaskutustiedot löydät yhteystietosivulta.',
    people: ['helmi'],
  },
]

/**
 * "Kenelle soitan?" – picks the right named contact for the visitor's situation.
 * Keyboard: arrow keys move between options (tabs pattern).
 */
export function NeedRouter({ location = 'home' }: { location?: string }) {
  const [active, setActive] = useState(0)
  const base = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const r = routesList[active]

  const select = (i: number, focus = false) => {
    setActive(i)
    track('router_select', { location, option: routesList[i].id })
    if (focus) tabs.current[i]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    const n = routesList.length
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      select((active + 1) % n, true)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      select((active - 1 + n) % n, true)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(0, true)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(n - 1, true)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
      <div role="tablist" aria-label="Valitse asia" aria-orientation="vertical" className="relative flex flex-col gap-2" onKeyDown={onKey}>
        {routesList.map((x, i) => {
          const on = i === active
          return (
            <button
              key={x.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${x.id}`}
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={`group relative flex min-h-[64px] items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 text-left transition-[background-color,border-color,color] duration-300 ${
                on ? 'border-graphite bg-graphite text-white' : 'border-[#c8d4dc] bg-white text-graphite hover:border-graphite'
              }`}
            >
              <span>
                <span className="block font-[650] leading-snug">{x.label}</span>
                <span className={`mt-0.5 block text-[0.88rem] ${on ? 'text-fog' : 'text-steel'}`}>{x.hint}</span>
              </span>
              <span
                aria-hidden="true"
                className={`valve shrink-0 transition-transform duration-500 ${on ? 'rotate-90 text-flow' : 'text-[#9fb1bd] group-hover:text-graphite'}`}
              />
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${r.id}`}
        className="on-dark blueprint relative overflow-hidden rounded-[26px] bg-ink p-6 text-white sm:p-8"
      >
        <p className="tag text-flow-lite">{r.label}</p>
        <h3 className="display-s mt-3">{r.title}</h3>
        <p className="mt-3 max-w-[34rem] text-fog">{r.text}</p>

        <div className="mt-6 grid gap-3">
          {r.orders && (
            <div className="relative rounded-[20px] border border-flow/40 bg-ink-3 p-5 sm:p-6">
              <p className="tag text-flow-lite">Työtilaukset</p>
              <a
                href={company.phone.href}
                onClick={() => track('phone_click', { location: `${location}_router` })}
                className="mt-2 inline-flex min-h-12 items-center gap-3 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.2rem)] font-[600] tracking-[-0.03em] text-white hover:text-flow-lite"
              >
                <Phone size={26} aria-hidden="true" className="text-flow" />
                <span className="num">{company.phone.display}</span>
              </a>
              <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-fog">
                <Clock size={16} aria-hidden="true" className="text-flow" /> Arkisin 7.00–15.30
              </p>
            </div>
          )}
          {r.people.map((id) => (
            <PersonCard key={id} p={person(id)} dark location={`${location}_router`} />
          ))}
        </div>

        {r.cta && (
          <Link
            to={quoteHref(r.cta.kind)}
            onClick={() => track('cta_click', { location: `${location}_router`, label: r.cta!.kind })}
            className="btn btn-primary mt-6"
          >
            {r.cta.label}
          </Link>
        )}
      </div>
    </div>
  )
}
