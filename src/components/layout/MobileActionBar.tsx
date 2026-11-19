import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import { company } from '../../data/company'
import { quoteHref } from '../../data/nav'
import { track } from '../../lib/analytics'

/** Thumb-reach contact actions on phones and tablets. */
export function MobileActionBar() {
  return (
    <div
      data-action-bar
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2.5">
        <a
          href={company.phone.href}
          onClick={() => track('phone_click', { location: 'action_bar' })}
          className="btn btn-outline !min-h-[48px] !px-3 text-white"
        >
          <Phone size={18} aria-hidden="true" /> Soita
        </a>
        <Link
          to={quoteHref()}
          onClick={() => track('cta_click', { location: 'action_bar', label: 'pyyda_tarjous' })}
          className="btn btn-primary !min-h-[48px] !px-3"
        >
          Pyydä tarjous
        </Link>
      </div>
    </div>
  )
}
