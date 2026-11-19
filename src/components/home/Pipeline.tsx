import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { services, toneColor } from '../../data/services'
import { Photo } from '../ui/Photo'
import { track } from '../../lib/analytics'

/**
 * Signature interaction #2 – "Nousulinja" (the riser).
 * The four service lines hang off one vertical riser. As the visitor scrolls, the riser fills
 * with the service colours (heat → water → air → asbestos warning) and each valve turns open
 * when the flow reaches it. One passive scroll listener, active only while the section is in
 * view; with reduced motion the riser is shown full and all valves open.
 */
export function Pipeline() {
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const rows = Array.from(el.querySelectorAll<HTMLElement>('[data-node]'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.style.setProperty('--fill', '1')
      rows.forEach((r) => (r.dataset.open = 'true'))
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const box = el.getBoundingClientRect()
      const probe = window.innerHeight * 0.62
      const fill = Math.min(1, Math.max(0, (probe - box.top) / box.height))
      el.style.setProperty('--fill', fill.toFixed(4))
      for (const r of rows) {
        const node = r.getBoundingClientRect().top + 28
        r.dataset.open = String(node < probe)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
        update()
      } else {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    })
    io.observe(el)
    update()
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const gradient = `linear-gradient(to bottom, ${toneColor.heat} 0 22%, ${toneColor.flow} 30% 50%, ${toneColor.air} 56% 74%, ${toneColor.signal} 82% 100%)`

  return (
    <div ref={wrap} className="relative" style={{ ['--fill' as string]: 0 }}>
      {/* Riser */}
      <span aria-hidden="true" className="absolute bottom-10 left-[11px] top-3 w-[3px] rounded-full bg-white/10 sm:left-[15px]" />
      <span
        aria-hidden="true"
        className="absolute bottom-10 left-[11px] top-3 w-[3px] rounded-full sm:left-[15px]"
        style={{ background: gradient, clipPath: 'inset(0 0 calc((1 - var(--fill)) * 100%) 0 round 3px)' }}
      />

      <ol className="relative grid gap-14 sm:gap-20">
        {services.map((s, i) => (
          <li key={s.id} data-node data-open="false" className="relative pl-12 sm:pl-16">
            {/* Valve on the riser */}
            <span
              aria-hidden="true"
              className="riser-valve absolute left-0 top-1 grid size-[25px] place-items-center rounded-full border-2 border-white/25 bg-ink text-fog sm:size-[33px]"
            >
              <span className="valve-gate valve !h-[8px] !w-[11px]" />
            </span>
            {/* Branch from the riser to the content */}
            <span aria-hidden="true" className="absolute left-[25px] top-[13px] h-[2px] w-[14px] rounded bg-white/20 sm:left-[33px] sm:top-[17px] sm:w-[22px]" />

            <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:gap-10">
              <div>
                <p className="tag flex items-center gap-3 text-fog">
                  <span className="num" style={{ color: toneColor[s.tone] }}>
                    {s.code}
                  </span>
                  <span className="h-px w-8 bg-white/20" aria-hidden="true" />
                  {i === 3 ? 'Haitta-aineet' : 'LVI'}
                </p>
                <h3 className="display-l mt-3 text-white">{s.label}</h3>
                <p className="mt-4 max-w-[34rem] text-[1.06rem] text-fog">{s.short}</p>
                <ul className="valve-list mt-5 grid gap-2 text-[0.98rem] text-white/90" style={{ ['--marker' as string]: toneColor[s.tone] }}>
                  {s.items.slice(0, 4).map((it) => (
                    <li key={it.name}>{it.name}</li>
                  ))}
                </ul>
                <Link
                  to={s.path}
                  onClick={() => track('service_interest', { location: 'home_pipeline', service: s.id })}
                  className="go mt-7 text-white hover:text-flow-lite"
                >
                  {s.label}-palvelut <span className="sr-only">– lue lisää</span>
                  <span className="go-line" aria-hidden="true" />
                </Link>
              </div>
              <figure className="relative self-start overflow-hidden rounded-[22px] bg-ink-3" data-wipe>
                <Photo
                  k={s.photo}
                  alt={s.photoAlt}
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                  position={s.id === 'asbesti' ? '50% 70%' : s.id === 'vesi' ? '50% 40%' : undefined}
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[0.74rem] font-[600] text-fog backdrop-blur-sm">
                  Kuvituskuva
                </figcaption>
              </figure>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
