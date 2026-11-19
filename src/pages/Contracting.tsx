import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHead } from '../components/ui/SectionHead'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { Photo } from '../components/ui/Photo'
import { PersonCard } from '../components/ui/PersonCard'
import { person } from '../data/company'
import { faqs } from '../data/faq'
import { services, toneColor } from '../data/services'
import { quoteHref } from '../data/nav'
import { track } from '../lib/analytics'

/** Renovation phases in which WP-Putki's own services are involved (all verified services). */
const phases = [
  { code: 'A', title: 'Haitta-ainekartoitus', text: 'Asbesti- ja haitta-ainekartoitus ennen purkua, kun rakentaminen on aloitettu ennen vuotta 1994.', tone: toneColor.signal },
  { code: 'B', title: 'Purkutyöt', text: 'Asbesti- ja haitta-aineita sisältävien rakenteiden purku.', tone: toneColor.signal },
  { code: 'C', title: 'Uudet linjat', text: 'Vesi- ja lämpöjohdot, lämmönjakokeskus, ilmanvaihtolaitteet ja -putkistot.', tone: toneColor.flow },
  { code: 'D', title: 'Mittaukset ja huolto', text: 'Ilmamäärien mittaukset ja säädöt sekä laitteiden huollot jatkossa.', tone: toneColor.air },
]

const checklist = [
  'Kohteen osoite ja rakennusvuosi',
  'Urakan laajuus ja urakkarajat',
  'Suunnitelmat ja urakka-asiakirjat, jos ne ovat valmiina',
  'Kuntotutkimus tai haitta-ainekartoitus, jos se on tehty',
  'Toivottu aikataulu ja mahdolliset rajoitteet (asukkaat, toiminta)',
  'Yhteyshenkilö: hallitus, isännöitsijä tai rakennuttajakonsultti',
]

export function Contracting() {
  const contractFaq = [faqs[1], faqs[5], faqs[0]]
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Urakointi' }]}
        tag="Urakointi"
        title="LVI-urakat taloyhtiöille ja yrityksille"
        lead="Linjasaneeraukset, lämmönjakokeskusten ja lämpöjohtojen uusinnat, ilmanvaihtotyöt sekä asbesti- ja haitta-ainetyöt – urakkalaskennasta työnjohtoon. Palvelemme taloyhtiöitä, isännöitsijöitä sekä teollisuuden ja muiden alojen yrityksiä Joensuussa ja lähialueilla."
        aside={
          <div className="grid gap-3">
            <PersonCard p={person('arto')} dark compact location="contracting_hero" />
            <PersonCard p={person('tuomas')} dark compact location="contracting_hero" />
          </div>
        }
      >
        <Link to={quoteHref('urakka')} onClick={() => track('cta_click', { location: 'contracting_hero', label: 'urakka' })} className="btn btn-primary">
          Pyydä urakkatarjous
        </Link>
      </PageHero>

      {/* What we contract */}
      <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="urakat-title">
        <div className="container-x">
          <SectionHead
            id="urakat-title"
            tag="Mitä urakoimme"
            title="Koko talon tekniikka – yhdeltä urakoitsijalta."
            intro="Kun haitta-ainetyöt ja LVI-työt tulevat samalta yritykseltä, remontissa on vähemmän rajapintoja ja aikatauluja sovitettavaksi yhteen."
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[26px] bg-[#c8d4dc] sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.id} className="flex flex-col bg-white p-6 sm:p-7" data-reveal style={{ ['--d' as string]: 70 * i }}>
                <span aria-hidden="true" className="h-[4px] w-10 rounded" style={{ background: toneColor[s.tone] }} />
                <h3 className="display-s mt-5 text-graphite">{s.label}</h3>
                <ul className="valve-list mt-4 grid gap-2 text-[0.97rem] text-steel">
                  {s.items.slice(0, 3).map((it) => (
                    <li key={it.name}>{it.name}</li>
                  ))}
                </ul>
                <Link to={s.path} className="go mt-auto pt-6 text-graphite hover:text-flow-deep">
                  Lue lisää <span className="sr-only">: {s.label}</span>
                  <span className="go-line" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phases */}
      <section className="on-dark relative overflow-hidden bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="vaiheet-title">
        <div className="blueprint absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead
            dark
            id="vaiheet-title"
            tag="Remontin linja"
            title="Kartoituksesta uusiin putkiin."
            intro="Vaiheet, joissa WP-Putki voi olla mukana saneerauksessa. Urakan sisältö ja rajat sovitaan aina kohdekohtaisesti."
          />
          <ol className="relative mt-12 grid gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden="true" className="absolute left-[15px] top-4 h-[calc(100%-2rem)] w-[3px] rounded bg-white/12 lg:left-4 lg:right-4 lg:top-[15px] lg:h-[3px] lg:w-auto" />
            {phases.map((p, i) => (
              <li key={p.code} className="relative pl-14 lg:pl-0 lg:pt-14" data-reveal style={{ ['--d' as string]: 110 * i }}>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid size-[33px] place-items-center rounded-full border-[3px] bg-ink font-mono text-[0.8rem] font-[600] text-white"
                  style={{ borderColor: p.tone }}
                >
                  {p.code}
                </span>
                <h3 className="display-s text-white">{p.title}</h3>
                <p className="mt-2 text-fog">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RFQ checklist */}
      <section className="bg-paper-2 py-16 sm:py-20 lg:py-24" aria-labelledby="lista-title">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHead
              id="lista-title"
              tag="Tarjouspyyntö"
              title="Näillä tiedoilla tarjous on nopeampi laskea."
              intro="Mitä tarkemmin urakka on kuvattu, sitä vertailukelpoisempi tarjous. Puuttuvat tiedot voi täydentää myöhemmin."
            />
            <ul className="mt-8 grid gap-3" data-reveal>
              {checklist.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[1.02rem] text-graphite">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-flow text-ink">
                    <Check size={15} aria-hidden="true" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <Link to={quoteHref('urakka')} onClick={() => track('cta_click', { location: 'contracting_checklist', label: 'urakka' })} className="btn btn-ink mt-9">
              Lähetä tarjouspyyntö
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative col-span-2 overflow-hidden rounded-[22px]" data-wipe>
              <Photo k="fleet-2" alt="WP-Putken lava-auto ja pakettiautoja pihalla" sizes="(min-width: 1024px) 44vw, 100vw" className="aspect-[16/10] w-full object-cover" position="70% 60%" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.78rem] font-[600] text-white backdrop-blur-sm">WP-Putken kalustoa</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 120 }}>
              <Photo k="stock-saneeraus" alt="Vanhoja vesiputkia ja venttiilejä seinässä ennen uusimista (kuvituskuva)" sizes="(min-width: 1024px) 22vw, 50vw" className="aspect-square w-full object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.74rem] font-[600] text-fog backdrop-blur-sm">Kuvituskuva</figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 200 }}>
              <Photo k="stock-lampo-2" alt="Eristettyjä lämpöjohtoja putkistossa (kuvituskuva)" sizes="(min-width: 1024px) 22vw, 50vw" className="aspect-square w-full object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.74rem] font-[600] text-fog backdrop-blur-sm">Kuvituskuva</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="ukk-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <SectionHead id="ukk-title" tag="Usein kysyttyä" title="Urakoista lyhyesti." />
            <div className="mt-8" data-reveal>
              <PersonCard p={person('mika')} location="contracting_faq" />
            </div>
          </div>
          <div data-reveal>
            <FaqList items={contractFaq} />
          </div>
        </div>
      </section>

      <CtaBand
        location="contracting_closing"
        kind="urakka"
        cta="Pyydä urakkatarjous"
        title={
          <>
            Saneeraus suunnitteilla? <span className="text-flow">Lasketaan se.</span>
          </>
        }
        text="Lähetä kohteen tiedot ja mahdolliset asiakirjat tarjouspyynnöllä, tai soita suoraan urakkalaskentaan: Arto Korhonen 050 385 0540 tai Tuomas Mononen 050 382 5029."
      />
    </>
  )
}
