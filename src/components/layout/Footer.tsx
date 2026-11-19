import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { company } from '../../data/company'
import { services } from '../../data/services'
import { nav } from '../../data/nav'
import { track } from '../../lib/analytics'

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden border-t border-white/10 bg-[#040b11] pb-28 text-fog lg:pb-10">
      {/* Sign-off: the slogan on a pipe run */}
      <div className="container-x pt-16 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="font-display text-[clamp(1.9rem,1.2rem+3.2vw,4.2rem)] font-[600] leading-[1.02] tracking-[-0.04em] text-white">
            Varmasti
            <br />
            <span className="text-flow">linjassaan.</span>
          </p>
          <p className="max-w-[22rem] text-[0.95rem] text-fog lg:text-right">
            Joensuulainen LVI-liike vuodesta {company.foundedYear}. Työtilaukset arkisin 7.00–15.30,{' '}
            <a href={company.phone.href} onClick={() => track('phone_click', { location: 'footer_signoff' })} className="link-u num font-[650] text-white">
              {company.phone.display}
            </a>
            .
          </p>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" aria-label={`${company.name} – etusivu`} className="inline-block rounded-md p-1">
              <Logo className="h-[72px] w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">
              Lämpö-, vesi- ja ilmanvaihtotyöt sekä asbesti- ja haitta-ainetyöt Joensuussa ja lähialueilla vuodesta {company.foundedYear}.
            </p>
          </div>

          <nav aria-label="Palvelut alatunnisteessa">
            <h2 className="tag mb-4 text-flow-lite">Palvelut</h2>
            <ul className="grid gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={s.path} className="link-u text-white/90 hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/urakointi" className="link-u text-white/90 hover:text-white">
                  Urakat taloyhtiöille
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Sivut alatunnisteessa">
            <h2 className="tag mb-4 text-flow-lite">Sivut</h2>
            <ul className="grid gap-2.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-u text-white/90 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/yhteystiedot#laskutus" className="link-u text-white/90 hover:text-white">
                  Laskutustiedot
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="tag mb-4 text-flow-lite">Yhteystiedot</h2>
            <ul className="grid gap-3 text-[0.97rem]">
              <li className="flex gap-3">
                <Phone size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-flow" />
                <span>
                  <a href={company.phone.href} className="link-u num font-[650] text-white">
                    {company.phone.display}
                  </a>
                  <br />
                  Työtilaukset ja asiakaspalvelu
                </span>
              </li>
              <li className="flex gap-3">
                <Clock size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-flow" />
                <span>
                  {company.hours.office}
                  <br />
                  {company.hours.store} <span className="whitespace-nowrap">(tiliasiakkaat)</span>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-flow" />
                <span>
                  {company.legalName}
                  <br />
                  {company.address.street}, {company.address.postalCode} {company.address.city}
                  <br />
                  Y-tunnus {company.businessId}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.84rem] text-fog/90 sm:flex-row sm:items-center sm:justify-between">
          <p>© {company.legalName}</p>
          <p>
            Konseptidemo: <span className="text-white/90">Hades Design</span> – ei WP-Putken virallinen verkkosivusto. Lomakkeet eivät lähetä tietoja.
          </p>
        </div>
      </div>
    </footer>
  )
}
