import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { company, maps } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps: nothing is loaded from Google until the visitor asks for
 * the map (no API key needed). Directions and "open in Google Maps" work without loading it.
 */
export function MapEmbed() {
  const [load, setLoad] = useState(false)
  return (
    <div className="overflow-hidden rounded-[26px] bg-ink-2">
      <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]">
        {load ? (
          <iframe
            title={`Kartta: ${company.legalName}, ${company.address.street}, ${company.address.city}`}
            src={maps.embed}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="on-dark blueprint absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center text-white">
            {/* Stylised street plan – decorative placeholder, not a map */}
            <svg aria-hidden="true" className="absolute inset-0 size-full opacity-40" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 400">
              <g fill="none" stroke="#3b5468" strokeWidth="2">
                <path d="M-20 270 C160 250 300 160 470 150 S760 90 840 70" />
                <path d="M210 -20 C240 120 250 260 230 420" />
                <path d="M-20 120 L840 190" />
                <path d="M560 -20 C540 140 560 280 610 420" />
              </g>
              <path d="M470 150 V205 H520" fill="none" stroke="#05AEF0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="520" cy="205" r="62" fill="none" stroke="#05AEF0" strokeOpacity=".35" />
              <circle cx="520" cy="205" r="112" fill="none" stroke="#05AEF0" strokeOpacity=".15" />
            </svg>
            <span className="relative grid size-14 place-items-center rounded-full bg-flow text-ink shadow-[0_0_0_10px_rgba(5,174,240,.2)]">
              <MapPin size={26} aria-hidden="true" />
            </span>
            <div className="relative">
              <p className="font-display text-[1.3rem] font-[600] tracking-[-0.02em]">{company.address.street}</p>
              <p className="text-fog">
                {company.address.postalCode} {company.address.city} · {company.address.district}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLoad(true)
                track('map_load')
              }}
              className="btn btn-primary relative"
            >
              Näytä kartta
            </button>
            <p className="relative max-w-sm text-[0.84rem] text-fog">Kartta ladataan Googlelta vasta, kun painat painiketta.</p>
          </div>
        )}
      </div>
      <div className="on-dark flex flex-wrap gap-3 p-4 sm:p-5">
        <a
          href={maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('directions_click')}
          className="btn btn-primary !min-h-[48px] flex-1 sm:flex-none"
        >
          <Navigation size={18} aria-hidden="true" /> Katso reittiohjeet
          <span className="sr-only">(avautuu uuteen välilehteen)</span>
        </a>
        <a href={maps.open} target="_blank" rel="noopener noreferrer" className="btn btn-outline !min-h-[48px] flex-1 text-white sm:flex-none">
          Avaa Google Mapsissa
          <span className="sr-only">(avautuu uuteen välilehteen)</span>
        </a>
      </div>
    </div>
  )
}
