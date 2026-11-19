import { Link } from 'react-router-dom'
import { quoteHref } from '../../data/nav'
import { track } from '../../lib/analytics'
import type { RequestKind } from '../../lib/forms/types'

const segments: { name: string; who: string; text: string; links: { to: string; label: string }[]; cta: { label: string; kind: RequestKind } }[] = [
  {
    name: 'Taloyhtiöt',
    who: 'Hallitukset, isännöitsijät ja rakennuttajat',
    text: 'Linjasaneeraukset, lämmönjakokeskusten ja lämpöjohtojen uusinnat, kanavanuohoukset ja ilmamäärien säädöt sekä haitta-ainekartoitukset ja purut – urakkalaskennasta työnjohtoon.',
    links: [
      { to: '/urakointi', label: 'Urakointi' },
      { to: '/palvelut/vesi', label: 'Linjasaneeraus' },
    ],
    cta: { label: 'Pyydä urakkatarjous', kind: 'urakka' },
  },
  {
    name: 'Yritykset ja teollisuus',
    who: 'Toimitilat, tuotantotilat ja kiinteistöt',
    text: 'LVI- ja IV-asennukset, huollot, mittaukset ja korjaukset sekä haitta-ainetyöt korjaushankkeisiin. Laskutus ja reskontra hoituvat nimetyn yhteyshenkilön kautta.',
    links: [
      { to: '/palvelut/ilma', label: 'Ilmanvaihto' },
      { to: '/palvelut/lampo', label: 'Lämmitys' },
    ],
    cta: { label: 'Kysy tarjous', kind: 'urakka' },
  },
  {
    name: 'Kotitaloudet',
    who: 'Omakoti- ja rivitalot, asunnot',
    text: 'Hanojen ja WC-istuinten uusinnat, putkivuodot, lämpöpumput ja kattilat, IV-koneen huollot sekä asbestikartoitus ennen remonttia.',
    links: [
      { to: '/palvelut/vesi', label: 'Vesi' },
      { to: '/palvelut/asbesti', label: 'Asbestikartoitus' },
    ],
    cta: { label: 'Jätä työtilaus', kind: 'huolto' },
  },
]

/** Who we work for – one row per customer segment (a list, not a card grid). */
export function Segments() {
  return (
    <ul className="border-t border-[#c8d4dc]">
      {segments.map((s, i) => (
        <li key={s.name} className="grid gap-4 border-b border-[#c8d4dc] py-8 lg:grid-cols-[0.9fr_1.4fr_0.8fr] lg:items-start lg:gap-10 lg:py-10" data-reveal style={{ ['--d' as string]: 70 * i }}>
          <div>
            <p className="tag num text-flow-deep">0{i + 1}</p>
            <h3 className="display-m mt-2 text-graphite">{s.name}</h3>
            <p className="mt-1.5 text-[0.95rem] text-steel">{s.who}</p>
          </div>
          <div>
            <p className="text-[1.06rem] text-graphite/90">{s.text}</p>
            <p className="mt-4 flex flex-wrap gap-2">
              {s.links.map((l) => (
                <Link key={l.to + l.label} to={l.to} className="chip border border-[#b4c3cd] bg-white text-graphite transition-colors hover:border-graphite">
                  {l.label}
                </Link>
              ))}
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              to={quoteHref(s.cta.kind)}
              onClick={() => track('cta_click', { location: 'home_segments', label: s.cta.kind })}
              className="go text-graphite hover:text-flow-deep"
            >
              {s.cta.label}
              <span className="go-line" aria-hidden="true" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
