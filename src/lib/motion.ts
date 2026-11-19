import { gsap } from 'gsap'

// Only the GSAP core is needed (homepage logo intro). Scroll effects use IntersectionObserver
// and a single passive scroll listener, so ScrollTrigger is intentionally not bundled.
export { gsap }
