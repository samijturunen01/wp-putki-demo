import { Plus } from 'lucide-react'
import type { Faq } from '../../data/services'

/** Accessible FAQ accordion built on <details> – works without JavaScript. */
export function FaqList({ items, dark }: { items: Faq[]; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? 'border-white/12' : 'border-[#c8d4dc]'}`}>
      {items.map((f) => (
        <details key={f.q} className={`group border-b ${dark ? 'border-white/12' : 'border-[#c8d4dc]'}`}>
          <summary
            className={`flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-left font-[650] text-[1.06rem] leading-snug [&::-webkit-details-marker]:hidden ${
              dark ? 'text-white' : 'text-graphite'
            }`}
          >
            {f.q}
            <span
              aria-hidden="true"
              className={`grid size-9 shrink-0 place-items-center rounded-full border transition-transform duration-300 group-open:rotate-45 ${
                dark ? 'border-white/25 text-flow' : 'border-[#b4c3cd] text-flow-deep'
              }`}
            >
              <Plus size={18} />
            </span>
          </summary>
          <p className={`max-w-[46rem] pb-6 pr-12 ${dark ? 'text-fog' : 'text-steel'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
