import type { ReactNode } from 'react'

interface Props {
  tag: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
  id?: string
  className?: string
}

/** Section heading: mono drawing label, display title, optional intro. */
export function SectionHead({ tag, title, intro, dark, id, className = '' }: Props) {
  return (
    <div className={`max-w-[46rem] ${className}`} data-reveal>
      <p className={`tag flex items-center gap-3 ${dark ? 'text-flow-lite' : 'text-flow-deep'}`}>
        <span aria-hidden="true" className={`h-[2px] w-7 rounded ${dark ? 'bg-flow' : 'bg-flow-deep'}`} />
        {tag}
      </p>
      <h2 id={id} className={`display-l mt-4 ${dark ? 'text-white' : 'text-graphite'}`}>
        {title}
      </h2>
      {intro && <div className={`lead mt-5 ${dark ? 'text-fog' : 'text-steel'}`}>{intro}</div>}
    </div>
  )
}
