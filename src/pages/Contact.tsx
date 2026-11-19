import { Clock, MapPin, Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { SectionHead } from '../components/ui/SectionHead'
import { FaqList } from '../components/ui/FaqList'
import { PersonCard } from '../components/ui/PersonCard'
import { QuoteForm } from '../components/forms/QuoteForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { company, person, type Person } from '../data/company'
import { faqs } from '../data/faq'
import { track } from '../lib/analytics'

/** Contact groups as on wp-putki.fi/yhteystiedot. */
const groups: { title: string; ids: Person['id'][] }[] = [
  { title: 'Urakointi ja tarjouslaskenta', ids: ['arto', 'tuomas'] },
  { title: 'Asbestikartoitus ja purku', ids: ['mika'] },
  { title: 'Laskutus ja reskontra', ids: ['helmi'] },
  { title: 'Toimitusjohtaja', ids: ['petri'] },
]

export function Contact() {
  const inv = company.invoicing
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Yhteystiedot' }]}
        tag="Yhteystiedot"
        title="Tilaa työ tai pyydä tarjous"
        lead="Työtilaukset otetaan vastaan arkisin 7.00–15.30. Urakat, asbestityöt, myymälä ja laskutus hoituvat suoraan oikean henkilön kanssa."
        aside={
          <div className="rounded-[26px] border border-flow/40 bg-ink-2 p-6 sm:p-7">
            <p className="tag text-flow-lite">Työtilaukset ja asiakaspalvelu</p>
            <a
              href={company.phone.href}
              onClick={() => track('phone_click', { location: 'contact_hero' })}
              className="mt-3 inline-flex min-h-12 items-center gap-3 font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-[600] tracking-[-0.03em] text-white hover:text-flow-lite"
            >
              <Phone size={28} aria-hidden="true" className="text-flow" />
              <span className="num">{company.phone.display}</span>
            </a>
            <ul className="mt-4 grid gap-2 text-fog">
              <li className="flex items-center gap-2.5">
                <Clock size={16} aria-hidden="true" className="text-flow" /> {company.hours.office}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} aria-hidden="true" className="text-flow" /> {company.address.street}, {company.address.postalCode} {company.address.city}
              </li>
            </ul>
          </div>
        }
      />

      {/* Form + side info */}
      <section id="tarjouspyynto" className="bg-paper py-14 sm:py-20 lg:py-24" aria-labelledby="lomake-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="tag flex items-center gap-3 text-flow-deep">
              <span aria-hidden="true" className="h-[2px] w-7 rounded bg-flow-deep" />
              Työtilaus ja tarjouspyyntö
            </p>
            <h2 id="lomake-title" className="display-l mt-4 text-graphite">
              Kerro, mitä kohteessa pitää tehdä.
            </h2>
            <p className="lead mt-4 max-w-[40rem] text-steel">Kolme lyhyttä vaihetta. Mitä tarkemmin kuvaat kohteen, sitä helpompi työ on hinnoitella ja aikatauluttaa.</p>
            <div className="mt-10">
              <QuoteForm />
            </div>
          </div>

          <aside className="lg:col-span-5" aria-label="Yhteystiedot lyhyesti">
            <div className="grid gap-4 lg:sticky lg:top-28">
              <div className="on-dark blueprint rounded-[26px] bg-ink p-6 text-white sm:p-7">
                <p className="tag text-flow-lite">Aukioloajat</p>
                <dl className="mt-4 grid gap-3">
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-fog">Työtilaukset</dt>
                    <dd className="num text-right font-[650]">ma–pe 7.00–15.30</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-fog">Toimisto</dt>
                    <dd className="num text-right font-[650]">ma–pe 7.00–15.30</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-fog">Myymälä (tiliasiakkaat)</dt>
                    <dd className="num text-right font-[650]">ma–pe 10.00–15.30</dd>
                  </div>
                </dl>
                <p className="mt-5 text-[0.92rem] text-fog">{company.storeNote}</p>
              </div>
              <PersonCard p={person('arto')} location="contact_aside" compact />
              <PersonCard p={person('mika')} location="contact_aside" compact />
            </div>
          </aside>
        </div>
      </section>

      {/* People */}
      <section className="bg-paper-2 py-16 sm:py-20 lg:py-24" aria-labelledby="henkilot-title">
        <div className="container-x">
          <SectionHead id="henkilot-title" tag="Henkilöt" title="Suoraan oikealle henkilölle." />
          <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-2">
            {groups.map((g) => (
              <div key={g.title} data-reveal>
                <h3 className="tag text-steel">{g.title}</h3>
                <div className="mt-3 grid gap-3">
                  {g.ids.map((id) => (
                    <PersonCard key={id} p={person(id)} location="contact_people" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="kartta" className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="kartta-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHead id="kartta-title" tag="Käyntiosoite" title={`${company.address.street}, ${company.address.city}`} intro={`${company.legalName} · ${company.address.postalCode} ${company.address.city} · ${company.address.district}`} />
          </div>
          <div className="mt-10" data-reveal>
            <MapEmbed />
          </div>
        </div>
      </section>

      {/* Invoicing */}
      <section id="laskutus" className="on-dark bg-ink py-16 text-white sm:py-20 lg:py-24" aria-labelledby="laskutus-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <SectionHead dark id="laskutus-title" tag="Laskutus" title="Laskutus­tiedot." intro={`Y-tunnus ${company.businessId}`} />
          </div>
          <div className="grid gap-px overflow-hidden rounded-[22px] bg-white/12 sm:grid-cols-3" data-reveal>
            <div className="bg-ink-2 p-6">
              <h3 className="tag text-flow-lite">Verkkolaskut</h3>
              <p className="mt-3 text-fog">Operaattori</p>
              <p className="num font-[600]">{inv.eInvoiceOperator}</p>
              <p className="mt-3 text-fog">Verkkolaskuosoite</p>
              <p className="num font-[600]">{inv.eInvoiceAddress}</p>
            </div>
            <div className="bg-ink-2 p-6">
              <h3 className="tag text-flow-lite">Paperilaskut</h3>
              <address className="mt-3 not-italic">
                {inv.paper.map((l) => (
                  <span key={l} className="num block font-[600]">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div className="bg-ink-2 p-6">
              <h3 className="tag text-flow-lite">Sähköpostilaskut</h3>
              <p className="mt-3 break-all font-[600]">{inv.emailInvoices}</p>
              <p className="mt-3 text-[0.9rem] text-fog">Laskutus ja reskontra: Helmi Burman, 050 377 3603</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24" aria-labelledby="ukk-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <SectionHead id="ukk-title" tag="Usein kysyttyä" title="Ennen kuin soitat." />
          <div data-reveal>
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
    </>
  )
}
