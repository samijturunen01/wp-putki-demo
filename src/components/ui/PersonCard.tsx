import { Mail, Phone } from 'lucide-react'
import type { Person } from '../../data/company'
import { track } from '../../lib/analytics'

interface Props {
  p: Person
  dark?: boolean
  location: string
  compact?: boolean
}

/** Named contact with click-to-call and e-mail – the shortest path to the right person. */
export function PersonCard({ p, dark, location, compact }: Props) {
  return (
    <div className={`relative rounded-[20px] border p-5 sm:p-6 ${dark ? 'border-white/12 bg-ink-3' : 'border-paper-2 bg-white'}`}>
      <span aria-hidden="true" className="absolute left-0 top-6 h-10 w-[3px] rounded-r bg-flow" />
      <p className={`font-display text-[1.08rem] font-[600] tracking-[-0.02em] ${dark ? 'text-white' : 'text-graphite'}`}>{p.name}</p>
      <p className={`mt-1 text-[0.95rem] ${dark ? 'text-fog' : 'text-steel'}`}>{p.role}</p>
      <div className={`mt-4 flex flex-col gap-2 ${compact ? '' : 'sm:flex-row sm:flex-wrap sm:gap-x-6'}`}>
        <a
          href={`tel:${p.phone.tel}`}
          onClick={() => track('phone_click', { location, person: p.id })}
          className={`inline-flex min-h-11 items-center gap-2.5 font-[650] ${dark ? 'text-white hover:text-flow-lite' : 'text-graphite hover:text-flow-deep'}`}
        >
          <Phone size={17} aria-hidden="true" className={dark ? 'text-flow' : 'text-flow-deep'} />
          <span className="num">{p.phone.display}</span>
          <span className="sr-only">– soita: {p.name}</span>
        </a>
        <a
          href={`mailto:${p.email}`}
          onClick={() => track('email_click', { location, person: p.id })}
          className={`inline-flex min-h-11 items-center gap-2.5 break-all ${dark ? 'text-fog hover:text-white' : 'text-steel hover:text-graphite'}`}
        >
          <Mail size={17} aria-hidden="true" className={dark ? 'text-flow' : 'text-flow-deep'} />
          <span className="link-u">{p.email}</span>
        </a>
      </div>
    </div>
  )
}
