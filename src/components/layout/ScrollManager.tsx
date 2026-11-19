import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { introState } from '../../lib/intro'

const positions = new Map<string, number>()
const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect

/**
 * Scroll behaviour on navigation:
 *  - New page (PUSH/REPLACE) without a hash → opens at the very top, instantly.
 *  - Hash links → jump to the target section (smooth only within the same page).
 *  - Back/forward (POP) → restores the stored position of that history entry.
 * Runs in a layout effect so the reset happens before paint (no flicker).
 */
export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  // Compare history keys (not a "first run" flag) so StrictMode's double effects stay idempotent.
  const initialKey = useRef(location.key)
  const lastPath = useRef(location.pathname)
  const lastSearch = useRef(location.search)
  // History entry currently on screen and its last known scroll position. The position is
  // saved for the outgoing entry synchronously at navigation time – browser scroll anchoring
  // can move the viewport while the new page is swapped in, so async listeners are unreliable.
  const shownKey = useRef(location.key)
  const lastY = useRef(0)

  useIsoLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const onScroll = () => {
      lastY.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useIsoLayoutEffect(() => {
    if (location.key === initialKey.current && !introState.navigated) {
      if (location.hash) scrollToHashAfterLayout(location.hash, false)
      return
    }
    introState.navigated = true
    if (shownKey.current !== location.key) {
      positions.set(shownKey.current, lastY.current)
      shownKey.current = location.key
    }
    const samePage = lastPath.current === location.pathname
    const searchChanged = lastSearch.current !== location.search
    lastPath.current = location.pathname
    lastSearch.current = location.search

    if (navType === 'POP') {
      const saved = positions.get(location.key)
      if (saved === undefined && location.hash) {
        scrollToHashAfterLayout(location.hash, samePage)
        return
      }
      const y = saved ?? 0
      window.scrollTo({ top: y, left: 0, behavior: 'instant' })
      requestAnimationFrame(() => window.scrollTo({ top: y, left: 0, behavior: 'instant' }))
      return
    }

    if (location.hash) {
      scrollToHashAfterLayout(location.hash, samePage)
      return
    }
    // Same page with only a query change (filters, lightbox) keeps its position.
    if (samePage && searchChanged) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.search, location.hash, location.key, navType])

  return null
}

function scrollToHash(hash: string, smooth = false) {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'instant', block: 'start' })
}

function scrollToHashAfterLayout(hash: string, samePage: boolean) {
  if (samePage) {
    scrollToHash(hash, true)
    return
  }
  scrollToHash(hash)
  requestAnimationFrame(() =>
    requestAnimationFrame(() => scrollToHash(hash)),
  )
}
