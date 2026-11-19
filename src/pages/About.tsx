import { Link } from 'react-router-dom'
import { PageHero } from '../components/ui/PageHero'
import { SectionHead } from '../components/ui/SectionHead'
import { CtaBand } from '../components/ui/CtaBand'
import { Photo } from '../components/ui/Photo'
import { PersonCard } from '../components/ui/PersonCard'
import { Feedback } from '../components/home/Feedback'
import { company, people } from '../data/company'

const facts: [string, string][] = [
  ['Yritys', company.legalName],
  ['Y-tunnus', company.businessId],
  ['Perustettu', '7.12.1989 (kaupparekisteri)'],
  ['Toimipiste', `${company.address.street}, ${company.address.postalCode} ${company.address.city} (${company.address.district})`],
  ['Toimiala', 'LVI-urakointi, -asennukset ja -huollot sekä asbesti- ja haitta-ainetyöt'],
  ['Asiakkaat', 'Taloyhtiöt, teollisuuden yritykset ja yksityisasiakkaat'],
  ['Palvelualue', 'Joensuu ja lähialueet'],
  ['Aukiolo', `${company.hours.office} · ${company.hours.store.toLowerCase()} (tiliasiakkaat)`],
]

export function About() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Yritys' }]}
        tag="Yritys"
        title="Joensuulainen LVI-liike vuodesta 1989"
        lead="WP-Putki yhdistää yli kolmen vuosikymmenen LVI-kokemuksen nykyaikaisiin ratkaisuihin. Teemme rakennusten lämpö-, vesi- ja ilmanvaihtotekniikan asennukset, saneeraukset ja huollot sekä asbesti- ja haitta-ainekartoitukset ja purkutyöt."
        aside={
          <p aria-hidden="true" className="select-none text-right font-display text-[clamp(5rem,3rem+9vw,11rem)] font-[600] leading-[0.85] tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_#05AEF0]">
            1989
          </p>
        }
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="tarina-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead id="tarina-title" tag="Meistä" title="Kodeille, taloyhtiöille ja yrityksille." />
            <div className="mt-6 grid gap-4 text-[1.06rem] text-steel" data-reveal>
              <p>
                Palvelemme asiakkaita Joensuussa ja sen lähialueilla – olipa kyse pienestä huoltotyöstä tai laajemmasta projektista. Meille on tärkeää
                ymmärtää asiakkaan tarpeet, jotta ratkaisu sopii juuri kyseiseen kohteeseen.
              </p>
              <p>
                Lämpö, vesi ja ilma ovat rakennuksen elintärkeät linjat. Asbesti- ja haitta-ainekartoitukset sekä purkutyöt tuovat saman katon alle myös
                remontin ensimmäiset vaiheet.
              </p>
              <p>
                Toimipisteemme ja myymälämme ovat Käpykankaalla osoitteessa {company.address.street}. Myymälä palvelee 25.5. alkaen tiliasiakkaita.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <figure className="relative col-span-2 overflow-hidden rounded-[22px]" data-wipe>
              <Photo k="fleet" alt="WP-Putken pakettiautoja rivissä syyspäivänä" sizes="(min-width: 1024px) 54vw, 100vw" className="aspect-[16/10] w-full object-cover" position="30% 60%" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.78rem] font-[600] text-white backdrop-blur-sm">WP-Putken autokalustoa</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 120 }}>
              <Photo k="store" alt="WP-Putken myymälä ja LVI-tarvikehyllyt" sizes="(min-width: 1024px) 27vw, 50vw" className="aspect-square w-full object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.78rem] font-[600] text-white backdrop-blur-sm">Myymälä</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 200 }}>
              <Photo k="showroom" alt="Hanoja ja suihkusetti esillä myymälän mallistossa" sizes="(min-width: 1024px) 27vw, 50vw" className="aspect-square w-full object-cover" position="50% 35%" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.78rem] font-[600] text-white backdrop-blur-sm">Hanamallisto</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="tiedot-title">
        <div className="blueprint absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <SectionHead dark id="tiedot-title" tag="Perustiedot" title="WP-Putki Oy lyhyesti." />
          <dl className="grid border-t border-white/12" data-reveal>
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-white/12 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="tag pt-1 text-flow-lite">{k}</dt>
                <dd className="text-[1.04rem] text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-paper-2 py-16 sm:py-20 lg:py-24" aria-labelledby="henkilot-title">
        <div className="container-x">
          <SectionHead
            id="henkilot-title"
            tag="Yhteyshenkilöt"
            title="Nimet ja numerot näkyvillä."
            intro="Jokaiselle asialle on oma yhteyshenkilönsä. Työtilaukset otetaan vastaan arkisin 7.00–15.30 numerossa 040 034 1377."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {people.map((p, i) => (
              <li key={p.id} data-reveal style={{ ['--d' as string]: 60 * i }}>
                <PersonCard p={p} location="about_people" compact />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-steel">
            Laskutustiedot ja kaikki yhteystiedot:{' '}
            <Link to="/yhteystiedot" className="link-u font-[650] text-graphite">
              Yhteystiedot
            </Link>
          </p>
        </div>
      </section>

      <section className="on-dark bg-ink-2 py-16 text-white sm:py-20 lg:py-24" aria-labelledby="palaute-title">
        <div className="container-x">
          <SectionHead dark id="palaute-title" tag="Asiakaspalautetta" title="Asiakkaiden sanoin." />
          <div className="mt-10">
            <Feedback />
          </div>
        </div>
      </section>

      <CtaBand
        location="about_closing"
        title={
          <>
            Yli 30 vuotta linjassa. <span className="text-flow">Seuraavaksi sinun kohteesi?</span>
          </>
        }
        text="Pyydä tarjous urakasta tai saneerauksesta, tai soita työtilaus huolto- ja korjaustöihin."
      />
    </>
  )
}
