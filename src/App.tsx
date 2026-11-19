import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { ServicePage } from './pages/ServicePage'
import { Contracting } from './pages/Contracting'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { services } from './data/services'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="palvelut" element={<Services />} />
        {services.map((s) => (
          <Route key={s.id} path={s.path.slice(1)} element={<ServicePage key={s.id} id={s.id} />} />
        ))}
        <Route path="urakointi" element={<Contracting />} />
        <Route path="yritys" element={<About />} />
        <Route path="yhteystiedot" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
