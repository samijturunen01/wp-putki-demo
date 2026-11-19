import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHead } from '../components/ui/SectionHead'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { Photo } from '../components/ui/Photo'
import { PersonCard } from '../components/ui/PersonCard'
import { serviceById, toneColor, type ServiceId } from '../data/services'
import { company, person } from '../data/company'
import { quoteHref } from '../data/nav'
import { track } from '../lib/analytics'

/** Related lines: the cross-sell that actually matters in a renovation. */
const related: Record<ServiceId, { id: ServiceId; why: string }[]> = {
  lampo: [
    { id: 'ilma', why: 'Ilmanvaihdon mittaukset ja säädöt samalla kertaa.' },
    { id: 'vesi', why: 'Käyttövesi ja lämmitys samassa tekniikkatilassa.' },
  ],
  vesi: [
    { id: 'asbesti', why: 'Ennen vuotta 1994 rakennetuissa kohteissa kartoitus ennen purkua.' },
    { id: 'lampo', why: 'Lämpöjohdot uusiksi samassa urakassa.' },
  ],
  ilma: [
    { id: 'lampo', why: 'Lämmitys ja ilmanvaihto toimivat parhaiten yhdessä.' },
    { id: 'asbesti', why: 'Vanhojen kanavien tiivisteet kartoitetaan ennen purkua.' },
  ],
  asbesti: [
    { id: 'vesi', why: 'Linjasaneeraus heti kartoituksen ja purun perään.' },
    { id: 'ilma', why: 'IV-kanavien uusinnat korjaushankkeen yhteydessä.' },
  ],
}

const closing: Record<ServiceId, string> = {
  lampo: "Lämmitysremontti mielessä?",
  vesi: "Putkiremontti tai vuotava hana?",
  ilma: "Ilmanvaihto kaipaa huoltoa?",
  asbesti: "Remontti tulossa vanhaan taloon?",
}
const groupName: Record<ServiceId, string> = { lampo: "Lämpöpalvelut", vesi: "Vesipalvelut", ilma: "IV-palvelut", asbesti: "Asbesti- ja purkupalvelut" }

export function ServicePage({ id }: { id: ServiceId }) {
  const s = serviceById(id)
  const kind = id === 'asbesti' ? 'asbesti' : 'urakka'
  const toneText = s.tone === 'heat' ? 'var(--color-heat-deep)' : 'var(--color-flow-deep)'

  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { to: '/palvelut', label: 'Palvelut' }, { label: s.label }]}
        tag={`${s.code} · ${s.label}`}
        title={s.title}
        lead={s.intro}
        aside={
          <figure className="relative overflow-hidden rounded-[22px]">
            <Photo k={s.photo} alt={s.photoAlt} priority sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[4px]" style={{ background: toneColor[s.tone] }} />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.74rem] font-[600] text-fog backdrop-blur-sm">Kuvituskuva</figcaption>
          </figure>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to={quoteHref(kind, id)} onClick={() => track('cta_click', { location: 'service_hero', label: id })} className="btn btn-primary">
            {s.cta}
          </Link>
          <a href={company.phone.href} onClick={() => track('phone_click', { location: 'service_hero', service: id })} className="btn btn-outline text-white">
            <Phone size={18} aria-hidden="true" /> Työtilaus <span className="num">{company.phone.display}</span>
          </a>
        </div>
      </PageHero>

      {/* Need + who benefits */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="tarve-title">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div data-reveal>
            <p className="tag flex items-center gap-3 text-flow-deep">
              <span aria-hidden="true" className="h-[3px] w-8 rounded" style={{ background: toneColor[s.tone] }} />
              Tarve
            </p>
            <h2 id="tarve-title" className="display-l mt-4 text-graphite">
              {s.need.title}
            </h2>
            <p className="lead mt-5 max-w-[40rem] text-steel">{s.need.text}</p>
          </div>
          <div data-reveal style={{ ['--d' as string]: 120 }}>
            <p className="tag text-steel">Kenelle</p>
            <ul className="mt-4 border-t border-[#c8d4dc]">
              {s.forWhom.map((f) => (
                <li key={f.segment} className="grid gap-1 border-b border-[#c8d4dc] py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <span className="font-[700] text-graphite">{f.segment}</span>
                  <span className="text-steel">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="on-dark relative overflow-hidden bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="sisalto-title">
        <div className="blueprint absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead dark id="sisalto-title" tag="Mitä teemme" title={`${groupName[id]} yhdellä silmäyksellä.`} />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[26px] bg-white/10 sm:grid-cols-2 lg:mt-14">
            {s.items.map((it, i) => (
              <li key={it.name} className="relative bg-ink-2 p-6 sm:p-8" data-reveal style={{ ['--d' as string]: 60 * i }}>
                <span className="tag num" style={{ color: toneColor[s.tone] }}>
                  {s.code}.{i + 1}
                </span>
                <h3 className="display-s mt-3 text-white">{it.name}</h3>
                <p className="mt-2.5 text-fog">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contacts */}
      <section className="bg-paper-2 py-16 sm:py-20 lg:py-24" aria-labelledby="yhteys-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHead
            id="yhteys-title"
            tag="Kysy suoraan"
            title="Oikea ihminen, suora numero."
            intro="Pienet huolto- ja korjaustyöt tilataan työtilausnumerosta. Urakoista ja kartoituksista voit soittaa suoraan asiasta vastaavalle."
          />
          <div className="grid gap-4">
            <div className="rounded-[20px] border border-paper-2 bg-white p-5 sm:p-6" data-reveal>
              <p className="tag text-flow-deep">Työtilaukset · arkisin 7.00–15.30</p>
              <a
                href={company.phone.href}
                onClick={() => track('phone_click', { location: 'service_contacts', service: id })}
                className="mt-2 inline-flex min-h-12 items-center gap-3 font-display text-[1.6rem] font-[600] tracking-[-0.03em] text-graphite hover:text-flow-deep"
              >
                <Phone size={24} aria-hidden="true" className="text-flow-deep" />
                <span className="num">{company.phone.display}</span>
              </a>
            </div>
            {s.contactIds.map((pid, i) => (
              <div key={pid} data-reveal style={{ ['--d' as string]: 80 * (i + 1) }}>
                <PersonCard p={person(pid)} location={`service_${id}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related lines + FAQ */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="ukk-title">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="tag text-steel">Samalla linjalla</p>
            <ul className="mt-4 grid gap-3">
              {related[id].map((r) => {
                const rs = serviceById(r.id)
                return (
                  <li key={r.id} data-reveal>
                    <Link to={rs.path} className="group flex items-start gap-4 rounded-2xl border border-[#c8d4dc] bg-white p-5 transition-colors hover:border-graphite">
                      <span aria-hidden="true" className="mt-1.5 h-[3px] w-7 shrink-0 rounded" style={{ background: toneColor[rs.tone] }} />
                      <span>
                        <span className="block font-display text-[1.1rem] font-[600] tracking-[-0.02em] text-graphite group-hover:text-flow-deep">{rs.label}</span>
                        <span className="mt-1 block text-[0.95rem] text-steel">{r.why}</span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h2 id="ukk-title" className="display-m text-graphite" data-reveal>
              Usein kysyttyä: <span style={{ color: toneText }}>{s.label.toLowerCase()}</span>
            </h2>
            <div className="mt-6" data-reveal>
              <FaqList items={s.faq} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        location={`service_${id}_closing`}
        kind={kind}
        area={id}
        cta={s.cta}
        title={
          <>
            {closing[id]} <span className="text-flow">Kerro kohteesta.</span>
          </>
        }
        text="Kuvaile lyhyesti kohde ja tarve – rakennusvuosi, laajuus ja toivottu aikataulu auttavat laskemaan tarjouksen."
      />
    </>
  )
}
