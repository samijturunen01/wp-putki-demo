import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from './App'

/** Render a route to static HTML for prerendering (see scripts/prerender.mjs). */
export function render(route: string, base: string) {
  const basename = base.replace(/\/$/, '') || '/'
  // GitHub Pages serves /route/ (trailing slash) – render the same URL the browser will hydrate.
  const path = route === '/' ? '/' : route === '/404' ? '/404-ei-loydy/' : `${route}/`
  const location = (basename === '/' ? '' : basename) + path
  return renderToString(
    <StrictMode>
      <StaticRouter location={location} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

export { routes } from './data/seo'
export { company } from './data/company'
export { faqs } from './data/faq'
export { services } from './data/services'
export { people, feedback } from './data/company'
