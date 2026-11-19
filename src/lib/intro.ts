/**
 * Homepage intro bookkeeping. The "pressure test" logo intro plays on every full page
 * load / refresh of the homepage (no storage or cookies are used), but not when the
 * visitor returns to the homepage through in-app navigation.
 */
export const introState = {
  /** Set by the scroll manager after the first in-app navigation. */
  navigated: false,
}

/** True only on a fresh load of the homepage with motion allowed (class set in index.html before paint). */
export const introAllowed = () =>
  typeof document !== 'undefined' && !introState.navigated && document.documentElement.classList.contains('intro-pending')

export const releaseIntroHold = () => {
  if (typeof document !== 'undefined') document.documentElement.classList.remove('intro-pending')
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
