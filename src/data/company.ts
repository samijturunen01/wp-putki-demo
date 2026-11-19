/**
 * Verified company facts – sources in docs/CONTENT_SOURCES.md.
 * Everything customer-facing about WP-Putki is read from here.
 */

export interface Person {
  id: 'petri' | 'arto' | 'tuomas' | 'mika' | 'helmi'
  name: string
  role: string
  /** Areas exactly as listed on wp-putki.fi/yhteystiedot */
  areas: string
  phone: { display: string; tel: string }
  email: string
}

export const company = {
  name: 'WP-Putki',
  legalName: 'WP-Putki Oy',
  tagline: 'Varmasti linjassaan!',
  businessId: '0761869-8',
  /** Trade register founding date (Vainu / Fonecta, from the register). Confirm with the customer. */
  foundedDate: '1989-12-07',
  foundedYear: 1989,
  /** wp-putki.fi: "Työtilausten vastaanotto 7.00-15.30" · "Puhelin 040 0341377" */
  phone: { display: '040 034 1377', href: 'tel:+358400341377', e164: '+358400341377' },
  address: {
    street: 'Ukkolantie 25',
    postalCode: '80130',
    city: 'Joensuu',
    district: 'Käpykangas',
    region: 'Pohjois-Karjala',
  },
  geo: { lat: 62.61928, lon: 29.74653 },
  hours: {
    office: 'Arkisin 7.00–15.30',
    orders: 'Työtilausten vastaanotto arkisin 7.00–15.30',
    store: 'Myymälä arkisin 10.00–15.30',
  },
  serviceArea: 'Joensuu ja lähialueet',
  /** wp-putki.fi/palvelut: "25.5 alkaen myynti vain tiliasiakkaille." */
  storeNote: 'Myymälän myynti vain tiliasiakkaille 25.5. alkaen.',
  website: 'https://www.wp-putki.fi/',
  invoicing: {
    eInvoiceOperator: 'Pagero 003723609900',
    eInvoiceAddress: '003707618698',
    paper: ['WP-Putki Oy', 'OVT 003707618698', 'PL 908', '02066 DOCUSCAN'],
    emailInvoices: '003707618698@xbs-salo.com',
  },
} as const

export const people: Person[] = [
  {
    id: 'arto',
    name: 'Arto Korhonen',
    role: 'IV-työt, urakkalaskenta, työnjohto',
    areas: 'Urakointi ja tarjouslaskenta',
    phone: { display: '050 385 0540', tel: '+358503850540' },
    email: 'arto.korhonen@wp-putki.fi',
  },
  {
    id: 'tuomas',
    name: 'Tuomas Mononen',
    role: 'Urakkalaskenta, työnjohto',
    areas: 'Urakointi ja tarjouslaskenta · myymälän tiliasiakkaat',
    phone: { display: '050 382 5029', tel: '+358503825029' },
    email: 'tuomas.mononen@wp-putki.fi',
  },
  {
    id: 'mika',
    name: 'Mika Heinonen',
    role: 'Asbestikartoitus ja -purku',
    areas: 'Asbestikartoitus ja purku',
    phone: { display: '040 727 7961', tel: '+358407277961' },
    email: 'mika.heinonen@wp-putki.fi',
  },
  {
    id: 'helmi',
    name: 'Helmi Burman',
    role: 'Laskutus ja myyntireskontra',
    areas: 'Laskutus ja reskontra',
    phone: { display: '050 377 3603', tel: '+358503773603' },
    email: 'helmi.burman@wp-putki.fi',
  },
  {
    id: 'petri',
    name: 'Petri Burman',
    role: 'Toimitusjohtaja',
    areas: 'Toimitusjohtaja',
    phone: { display: '050 575 0196', tel: '+358505750196' },
    email: 'petri.burman@wp-putki.fi',
  },
]

export const person = (id: Person['id']) => people.find((p) => p.id === id)!

const q = encodeURIComponent(`${company.legalName}, ${company.address.street}, ${company.address.postalCode} ${company.address.city}`)
export const maps = {
  /** Keyless embed (no Maps API key or billing needed). Loaded only on request. */
  embed: `https://maps.google.com/maps?q=${q}&z=15&output=embed`,
  open: `https://www.google.com/maps/search/?api=1&query=${q}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  /** Google reviews of the business (Maps listing). No rating is shown on the site – none verified. */
  reviews: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('WP-Putki Oy Joensuu arvostelut')}`,
}

/**
 * Customer feedback published on the current wp-putki.fi homepage (attributed there only as
 * "Asiakas"). Quoted verbatim; the fourth quote on the old site was left out only because of
 * its typing errors. Origin (Google or other) to be confirmed by the customer.
 */
export const feedback = [
  { quote: 'Ystävällinen ja asiantunteva palvelu. Harvinaisemmatkin LVI-osat löytyivät samalla käynnillä.' },
  { quote: 'Aina olen saanut mitä olen tarvinnut. Mukavaa ja asiantuntevaa henkilökuntaa.' },
  { quote: 'Hyvä ja ammattitaitoinen palvelu.' },
]

export const yearsSince = (now = new Date()) => now.getFullYear() - company.foundedYear
