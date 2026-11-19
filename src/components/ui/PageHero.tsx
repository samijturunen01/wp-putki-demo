import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Crumb {
  to?: string
  label: string
}

interface Props {
  tag: string
  title: ReactNode
  lead: ReactNode
  crumbs: Crumb[]
  children?: ReactNode
  aside?: ReactNode
}

/** Subpage hero on the night-blue drafting surface, with breadcrumbs. */
export function PageHero({ tag, title, lead, crumbs, children, aside }: Props) {
  return (
    <section className="on-dark blueprint relative overflow-hidden bg-ink text-white">
      <div className="container-x relative grid gap-10 pb-14 pt-8 sm:pt-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-20 lg:pt-14">
        <div>
          <nav aria-label="Murupolku">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.88rem] text-fog">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="h-px w-3 bg-white/30" />}
                  {c.to ? (
                    <Link to={c.to} className="link-u hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="tag mt-8 flex items-center gap-3 text-flow-lite">
            <span className="valve !h-[8px] !w-[11px] text-flow" aria-hidden="true" />
            {tag}
          </p>
          <h1 className="display-xl mt-4 max-w-[20ch] !text-[clamp(1.9rem,1.15rem+3.3vw,4.1rem)]">{title}</h1>
          <div className="lead mt-6 max-w-[40rem] text-fog">{lead}</div>
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div className="lg:pb-2">{aside}</div>}
      </div>
    </section>
  )
}
