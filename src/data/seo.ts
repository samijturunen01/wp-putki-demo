import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'LVI-urakointi ja -huolto Joensuussa | WP-Putki Oy',
    description:
      'Lämpö-, vesi- ja ilmanvaihtotyöt sekä asbesti- ja haitta-ainekartoitukset ja purut taloyhtiöille, yrityksille ja kotitalouksille Joensuussa vuodesta 1989. Pyydä tarjous.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'LVI-palvelut: lämpö, vesi, ilma ja asbesti | WP-Putki Joensuu',
    description:
      'WP-Putken palvelut: lämmönjakokeskukset ja lämpöpumput, linjasaneeraukset ja vesijohtotyöt, ilmanvaihdon asennukset ja huollot sekä asbesti- ja haitta-ainetyöt Joensuussa.',
  },
  ...services.map((s) => ({ path: s.path, label: s.label, title: s.seo.title, description: s.seo.description })),
  {
    path: '/urakointi',
    label: 'Urakointi',
    title: 'LVI-urakat taloyhtiöille ja yrityksille Joensuu | WP-Putki',
    description:
      'Linjasaneeraukset, lämmönjakokeskusten uusinnat, IV-urakat ja haitta-ainetyöt urakkalaskennasta työnjohtoon. Pyydä urakkatarjous WP-Putkelta Joensuusta.',
  },
  {
    path: '/yritys',
    label: 'Yritys',
    title: 'Joensuulainen LVI-liike vuodesta 1989 | WP-Putki Oy',
    description:
      'WP-Putki Oy on Joensuun Käpykankaalla toimiva LVI-alan yritys. Lämpö-, vesi- ja ilmanvaihtotyöt sekä asbestityöt taloyhtiöille, yrityksille ja kotitalouksille.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja tarjouspyyntö | WP-Putki Oy, Joensuu',
    description:
      'Työtilaukset arkisin 7.00–15.30 puh. 040 034 1377. Urakat, asbestityöt ja laskutus suoraan oikealle henkilölle. Ukkolantie 25, 80130 Joensuu.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | WP-Putki',
    description: 'Hakemaasi sivua ei löytynyt. Siirry WP-Putken etusivulle, palveluihin tai yhteystietoihin.',
  },
]

export const metaFor = (path: string) => {
  const clean = path.length > 1 ? path.replace(/\/$/, '') : path
  return routes.find((r) => r.path === clean) ?? routes.find((r) => r.path === '/404')!
}
