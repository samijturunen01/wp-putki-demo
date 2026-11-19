import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { company } from '../data/company'
import { services } from '../data/services'

/** Branded 404: the line ends in a plug – with clear ways back. */
export function NotFound() {
  return (
    <section className="on-dark blueprint relative overflow-hidden bg-ink text-white" aria-labelledby="nf-title">
      <div className="container-x grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div>
          <p className="tag text-flow-lite">Virhe 404</p>
          <h1 id="nf-title" className="display-xl mt-4 max-w-[14ch]">
            Tämä linja on <span className="text-flow">tulpattu.</span>
          </h1>
          <p className="lead mt-6 max-w-[36rem] text-fog">Hakemaasi sivua ei löytynyt. Se on voinut siirtyä, tai osoitteessa on kirjoitusvirhe.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/" className="btn btn-primary">
              Etusivulle
            </Link>
            <Link to="/palvelut" className="btn btn-outline text-white">
              Palvelut
            </Link>
            <a href={company.phone.href} className="btn btn-outline text-white">
              <Phone size={18} aria-hidden="true" /> {company.phone.display}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="chip border border-white/20 text-white hover:border-flow">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <svg viewBox="0 0 420 260" className="hidden w-full max-w-[460px] justify-self-end lg:block" aria-hidden="true">
          <path d="M10 200 H180 Q220 200 220 160 V90 Q220 50 260 50 H340" fill="none" stroke="#05AEF0" strokeWidth="10.4" strokeLinecap="round" />
          <rect x="338" y="30" width="26" height="40" rx="6" fill="#0a1824" stroke="#6fd3fb" strokeWidth="3" />
          <path d="M364 40 H380 M364 60 H380" stroke="#6fd3fb" strokeWidth="3" strokeLinecap="round" />
          <g fontFamily="'Geist Mono Variable', ui-monospace, monospace" fontSize="12" fill="#a3b4c2" letterSpacing="2">
            <text x="10" y="236">404 · EI LÖYTYNYT</text>
          </g>
        </svg>
      </div>
    </section>
  )
}
