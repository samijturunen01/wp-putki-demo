import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { nav, quoteHref } from '../../data/nav'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center gap-2 px-3 py-2 text-[0.97rem] font-[560] transition-colors ${
      isActive ? 'text-white' : 'text-fog hover:text-white'
    }`

  return (
    <>
      <header
        className={`on-dark sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          scrolled || open ? 'border-white/10 bg-ink/95 backdrop-blur-md' : 'border-transparent bg-ink'
        }`}
      >
        <div className="container-x flex h-[70px] items-center justify-between gap-4 lg:h-[82px]">
          <Link to="/" aria-label={`${company.name} – etusivu`} className="-ml-1 shrink-0 rounded-md p-1">
            <Logo className="h-[46px] w-auto lg:h-[56px]" />
          </Link>

          <nav aria-label="Päävalikko" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} end={n.to === '/'} className={linkCls}>
                    {({ isActive }) => (
                      <>
                        {/* Active item: a lit valve on the line */}
                        <span
                          aria-hidden="true"
                          className={`valve !h-[8px] !w-[11px] transition-[opacity,transform] duration-300 ${
                            isActive ? 'scale-100 text-flow opacity-100' : 'scale-50 opacity-0'
                          }`}
                        />
                        {n.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:gap-4">
            <a
              href={company.phone.href}
              onClick={() => track('phone_click', { location: 'header' })}
              className="hidden items-center gap-2 text-[0.97rem] font-[600] text-white transition-colors hover:text-flow-lite xl:inline-flex"
            >
              <Phone size={17} aria-hidden="true" className="text-flow" />
              <span className="num">{company.phone.display}</span>
            </a>
            <Link
              to={quoteHref()}
              onClick={() => track('cta_click', { location: 'header', label: 'pyyda_tarjous' })}
              className="btn btn-primary hidden !min-h-[46px] !px-5 !text-[0.95rem] sm:inline-flex"
            >
              Pyydä tarjous
            </Link>
            <a
              href={company.phone.href}
              onClick={() => track('phone_click', { location: 'header_mobile' })}
              className="grid size-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
              aria-label={`Soita työtilaus ${company.phone.display}`}
            >
              <Phone size={19} aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-[60] grid size-11 place-items-center rounded-full bg-white/10 text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobiilivalikko"
              aria-label={open ? 'Sulje' : 'Valikko'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu – outside <header>: its backdrop-filter would otherwise contain this fixed panel */}
      <div id="mobiilivalikko" hidden={!open} className="on-dark blueprint fixed inset-0 z-40 overflow-y-auto bg-ink pt-[104px] lg:hidden">
        <nav aria-label="Mobiilivalikko" className="container-x flex min-h-full flex-col pb-10 pt-2">
          <ul className="relative flex flex-col pl-6">
            {/* The menu hangs off a vertical riser */}
            <span aria-hidden="true" className="absolute bottom-6 left-[5px] top-6 w-[2px] rounded bg-flow/30" />
            {nav.map((n, i) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    `relative flex items-baseline justify-between border-b border-white/10 py-4 font-display text-[1.6rem] font-[600] tracking-[-0.03em] ${
                      isActive ? 'text-white' : 'text-fog'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden="true"
                        className={`absolute -left-6 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 ${
                          isActive ? 'border-flow bg-flow' : 'border-flow/50 bg-ink'
                        }`}
                      />
                      {n.label}
                      <span className="tag text-fog/70" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link to={quoteHref()} className="btn btn-primary w-full">
              Pyydä tarjous
            </Link>
            <a href={company.phone.href} className="btn btn-outline w-full text-white">
              <Phone size={18} aria-hidden="true" /> Soita työtilaus {company.phone.display}
            </a>
          </div>
          <p className="mt-6 text-[0.95rem] text-fog">
            {company.hours.orders}
            <br />
            {company.address.street}, {company.address.postalCode} {company.address.city}
          </p>
        </nav>
      </div>
    </>
  )
}
