import { useEffect } from 'react'

/**
 * Reveals [data-reveal] / [data-wipe] elements when they enter the viewport (adds .is-in).
 * One observer per page; re-scans when `key` changes.
 * [data-wipe] elements start fully clipped (zero visible area), which an IntersectionObserver
 * never reports as intersecting – so their parent is observed instead.
 */
export function useReveals(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-wipe]')).filter((el) => !el.classList.contains('is-in'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const targets = new Map<Element, HTMLElement[]>()
    for (const el of els) {
      const t = el.hasAttribute('data-wipe') && el.parentElement ? el.parentElement : el
      targets.set(t, [...(targets.get(t) ?? []), el])
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            targets.get(e.target)?.forEach((el) => el.classList.add('is-in'))
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    targets.forEach((_, t) => io.observe(t))
    return () => io.disconnect()
  }, [key])
}
