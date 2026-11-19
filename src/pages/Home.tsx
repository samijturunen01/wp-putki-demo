import { Link } from 'react-router-dom'
import { Hero } from '../components/home/Hero'
import { NeedRouter } from '../components/home/NeedRouter'
import { Pipeline } from '../components/home/Pipeline'
import { Segments } from '../components/home/Segments'
import { Feedback } from '../components/home/Feedback'
import { SectionHead } from '../components/ui/SectionHead'
import { FaqList } from '../components/ui/FaqList'
import { CtaBand } from '../components/ui/CtaBand'
import { Photo } from '../components/ui/Photo'
import { faqs } from '../data/faq'
import { company } from '../data/company'
import { quoteHref } from '../data/nav'
import { track } from '../lib/analytics'

export function Home() {
  return (
    <>
      <Hero />

      {/* 1 · Route the visitor to the right person */}
      <section className="blueprint-fine bg-paper py-16 sm:py-20 lg:py-28" aria-labelledby="kenelle-title">
        <div className="container-x">
          <SectionHead
            id="kenelle-title"
            tag="Kenelle soitan?"
            title={
              <>
                Valitse tilanne – <span className="text-flow-deep">näet heti oikean numeron.</span>
              </>
            }
            intro="Työtilaukset, urakat, asbestityöt, myymälä ja laskutus hoituvat kukin omalla linjallaan. Ei välikäsiä, ei turhia soittokierroksia."
          />
          <div className="mt-10 lg:mt-14">
            <NeedRouter />
          </div>
        </div>
      </section>

      {/* 2 · Services as four lines on one riser */}
      <section className="on-dark relative overflow-hidden bg-ink py-16 text-white sm:py-20 lg:py-28" aria-labelledby="linjat-title">
        <div className="blueprint absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              dark
              id="linjat-title"
              tag="Palvelut"
              title={
                <>
                  Neljä linjaa, <span className="text-flow">yksi urakoitsija.</span>
                </>
              }
              intro="Rakennusten lämpö-, vesi- ja ilmanvaihtotekniikka sekä asbesti- ja haitta-ainetyöt. Kun kartoitus, purku ja uudet linjat tulevat samalta yritykseltä, remontissa on vähemmän rajapintoja sovitettavaksi."
            />
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <Link to="/palvelut" className="btn btn-outline text-white">
                Kaikki palvelut
              </Link>
              <Link
                to={quoteHref('urakka')}
                onClick={() => track('cta_click', { location: 'home_pipeline', label: 'urakka' })}
                className="btn btn-primary"
              >
                Pyydä tarjous
              </Link>
            </div>
          </div>
          <Pipeline />
        </div>
      </section>

      {/* 3 · Who we work for */}
      <section className="bg-paper py-16 sm:py-20 lg:py-28" aria-labelledby="asiakkaat-title">
        <div className="container-x">
          <SectionHead
            id="asiakkaat-title"
            tag="Asiakkaat"
            title="Taloyhtiöille, yrityksille ja koteihin."
            intro="Palvelemme asiakkaita Joensuussa ja sen lähialueilla – pienestä huoltotyöstä laajaan urakkaan."
          />
          <div className="mt-10 lg:mt-14">
            <Segments />
          </div>
        </div>
      </section>

      {/* 4 · Authentic proof: fleet and store */}
      <section className="bg-paper-2 py-16 sm:py-20 lg:py-28" aria-labelledby="kalusto-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHead
              id="kalusto-title"
              tag={`Käpykangas · vuodesta ${company.foundedYear}`}
              title="Tunnistat meidät autoista."
              intro="Valkoinen auto, musta keula ja syaani WP-logo. Toimipiste ja myymälä ovat Käpykankaalla osoitteessa Ukkolantie 25."
            />
            <p className="text-steel lg:pb-2" data-reveal>
              Myymälän myynti on 25.5. alkaen vain tiliasiakkaille. Tiliasiakkaiden asioissa auttaa Tuomas Mononen, puh.{' '}
              <a href="tel:+358503825029" className="link-u num font-[650] text-graphite">
                050 382 5029
              </a>
              .
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[1.55fr_1fr] lg:grid-rows-2">
            <figure className="relative overflow-hidden rounded-[22px] sm:col-span-2 lg:col-span-1 lg:row-span-2" data-wipe>
              <Photo k="fleet" alt="WP-Putken valkoisia pakettiautoja rivissä, keulassa WP Putki -logo" sizes="(min-width: 1024px) 58vw, 100vw" className="h-full min-h-[280px] w-full object-cover" position="30% 60%" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[0.82rem] font-[600] text-white backdrop-blur-sm">
                WP-Putken autokalustoa
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 120 }}>
              <Photo k="store" alt="WP-Putken myymälä: hyllyt täynnä LVI-tarvikkeita ja palvelutiski" sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[0.82rem] font-[600] text-white backdrop-blur-sm">
                Myymälä – tiliasiakkaille
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[22px]" data-wipe style={{ ['--d' as string]: 220 }}>
              <Photo k="fleet-2" alt="WP-Putken lava-auto ja pakettiautoja toimitilan pihalla" sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] h-full w-full object-cover" position="70% 60%" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[0.82rem] font-[600] text-white backdrop-blur-sm">
                Lava-auto ja pakettiautot
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 5 · Customer feedback */}
      <section className="on-dark bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="palaute-title">
        <div className="container-x">
          <SectionHead dark id="palaute-title" tag="Asiakaspalautetta" title="Asiakkaiden sanoin." intro="Asiakkaat kehuvat ystävällistä ja asiantuntevaa palvelua – ja sitä, että harvinaisemmatkin LVI-osat löytyvät." />
          <div className="mt-10 lg:mt-12">
            <Feedback />
          </div>
        </div>
      </section>

      {/* 6 · FAQ */}
      <section className="bg-paper py-16 sm:py-20 lg:py-28" aria-labelledby="ukk-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <SectionHead id="ukk-title" tag="Usein kysyttyä" title="Ennen kuin soitat." intro="Lyhyet vastaukset yleisimpiin kysymyksiin hinnoista, palvelualueesta ja asbestikartoituksesta." />
          <div data-reveal>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        location="home_closing"
        title={
          <>
            Kerro kohde. <span className="text-flow">Me laskemme loput.</span>
          </>
        }
        text="Lähetä tarjouspyyntö urakasta, saneerauksesta tai kartoituksesta – tai soita työtilaus, kun vika on jo päällä. Mitä tarkemmin kerrot kohteesta, sitä nopeammin pääsemme asiaan."
      />
    </>
  )
}
