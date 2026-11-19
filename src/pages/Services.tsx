import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { SectionHead } from '../components/ui/SectionHead'
import { CtaBand } from '../components/ui/CtaBand'
import { Photo } from '../components/ui/Photo'
import { services, toneColor } from '../data/services'
import { company } from '../data/company'
import { quoteHref } from '../data/nav'
import { track } from '../lib/analytics'

/** "Jakotukki" (manifold): the four service lines branch off one header pipe. */
function Manifold() {
  return (
    <nav aria-label="Palvelulinjat" className="relative rounded-[26px] border border-white/12 bg-ink-2/80 p-5 sm:p-6">
      <p className="tag text-fog">Jakotukki</p>
      <div className="relative mt-4">
        <span aria-hidden="true" className="absolute bottom-7 left-[7px] top-7 w-[3px] rounded-full bg-white/15" />
        <ul className="grid gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <Link to={s.path} className="group relative flex min-h-14 items-center gap-4 rounded-2xl py-2 pl-7 pr-3 transition-colors hover:bg-white/5">
                <span aria-hidden="true" className="absolute left-[2px] top-1/2 size-[13px] -translate-y-1/2 rounded-full border-[3px] bg-ink" style={{ borderColor: toneColor[s.tone] }} />
                <span aria-hidden="true" className="absolute left-[15px] top-1/2 h-[3px] w-3 -translate-y-1/2 rounded" style={{ background: toneColor[s.tone] }} />
                <span className="tag num" style={{ color: toneColor[s.tone] }}>
                  {s.code}
                </span>
                <span className="font-display text-[1.15rem] font-[600] tracking-[-0.02em] text-white">{s.label}</span>
                <span className="go ml-auto text-fog group-hover:text-white" aria-hidden="true">
                  <span className="go-line !w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Palvelut' }]}
        tag="Palvelut"
        title="LVI-palvelut Joensuussa: lämpö, vesi, ilma ja asbesti"
        lead="Ammattilaisen palvelut rakennusten lämpö-, vesi- ja ilmanvaihtotekniikassa – asennuksesta huoltoon ja korjaukseen. Lisäksi asbesti- ja haitta-ainekartoitukset ja purkutyöt taloyhtiöille, teollisuuden yrityksille ja yksityisasiakkaille."
        aside={<Manifold />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={quoteHref('urakka')} onClick={() => track('cta_click', { location: 'services_hero', label: 'urakka' })} className="btn btn-primary">
            Pyydä tarjous
          </Link>
          <a href={company.phone.href} onClick={() => track('phone_click', { location: 'services_hero' })} className="btn btn-outline text-white">
            Soita työtilaus <span className="num">{company.phone.display}</span>
          </a>
        </div>
      </PageHero>

      {services.map((s, i) => (
        <section key={s.id} className={`${i % 2 ? 'bg-paper-2' : 'bg-paper'} py-16 sm:py-20 lg:py-24`} aria-labelledby={`${s.id}-title`}>
          <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
              <p className="tag flex items-center gap-3 text-steel" data-reveal>
                <span className="num font-[600]" style={{ color: s.tone === 'heat' ? 'var(--color-heat-deep)' : 'var(--color-flow-deep)' }}>
                  {s.code}
                </span>
                <span aria-hidden="true" className="h-[3px] w-10 rounded" style={{ background: toneColor[s.tone] }} />
                {s.label}
              </p>
              <h2 id={`${s.id}-title`} className="display-l mt-4 text-graphite" data-reveal>
                {s.title}
              </h2>
              <p className="lead mt-5 max-w-[42rem] text-steel" data-reveal>
                {s.intro}
              </p>
              <ul className="valve-list mt-7 grid gap-x-8 gap-y-2.5 text-[1.02rem] text-graphite sm:grid-cols-2" data-reveal>
                {s.items.map((it) => (
                  <li key={it.name}>{it.name}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>
                <Link to={s.path} onClick={() => track('service_interest', { location: 'services', service: s.id })} className="btn btn-ink">
                  {s.label}: lue lisää
                </Link>
                <Link
                  to={quoteHref(s.id === 'asbesti' ? 'asbesti' : 'urakka', s.id)}
                  onClick={() => track('cta_click', { location: 'services', label: s.id })}
                  className="go text-graphite hover:text-flow-deep"
                >
                  {s.cta}
                  <span className="go-line" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <figure className={`relative self-start overflow-hidden rounded-[22px] lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`} data-wipe>
              <Photo k={s.photo} alt={s.photoAlt} sizes="(min-width: 1024px) 38vw, 100vw" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.74rem] font-[600] text-fog backdrop-blur-sm">Kuvituskuva</figcaption>
            </figure>
          </div>
        </section>
      ))}

      <section className="on-dark bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="myymala-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <div>
            <SectionHead
              dark
              id="myymala-title"
              tag="Myymälä"
              title="LVI-myymälä tiliasiakkaille."
              intro={`${company.storeNote} Myymälä palvelee osoitteessa ${company.address.street}, ${company.hours.store.toLowerCase()}.`}
            />
            <p className="mt-6 text-fog" data-reveal>
              Tiliasiakkaiden asioissa:{' '}
              <a href="tel:+358503825029" className="link-u num font-[650] text-white">
                Tuomas Mononen, 050 382 5029
              </a>
            </p>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] gap-4">
            <figure className="overflow-hidden rounded-[22px]" data-wipe>
              <Photo k="store" alt="WP-Putken myymälän hyllyjä ja palvelutiski" sizes="(min-width: 1024px) 28vw, 58vw" className="aspect-[4/5] h-full w-full object-cover" position="40% 50%" />
            </figure>
            <figure className="overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 140 }}>
              <Photo k="showroom" alt="Hana- ja suihkumallisto WP-Putken myymälässä" sizes="(min-width: 1024px) 20vw, 40vw" className="aspect-[3/5] h-full w-full object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand
        location="services_closing"
        title={
          <>
            Löytyikö oikea linja? <span className="text-flow">Kerro kohteesta.</span>
          </>
        }
        text="Tarjouspyyntö urakasta tai saneerauksesta, työtilaus huoltoon tai korjaukseen – ohjaa pyyntösi oikealle asiantuntijalle lomakkeella tai puhelimella."
      />
    </>
  )
}
