import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './styles/index.css'

declare global {
  interface Window {
    __wpReady?: boolean
  }
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages hydrate; the dev server renders from scratch.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
window.__wpReady = true
