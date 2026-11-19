import type { Page } from '@playwright/test'

export const BASE = '/wp-putki-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /LVI-työt Joensuussa/ },
  { path: 'palvelut/', h1: /LVI-palvelut Joensuussa/ },
  { path: 'palvelut/lampo/', h1: /Lämmitys linjassa/ },
  { path: 'palvelut/vesi/', h1: /ja vesijohto/ },
  { path: 'palvelut/ilma/', h1: /asennukset, huollot, mittaukset ja säädöt/ },
  { path: 'palvelut/asbesti/', h1: /Asbesti- ja haitta-aine/ },
  { path: 'urakointi/', h1: /LVI-urakat taloyhtiöille ja yrityksille/ },
  { path: 'yritys/', h1: /Joensuulainen LVI-liike vuodesta 1989/ },
  { path: 'yhteystiedot/', h1: /Tilaa työ tai pyydä tarjous/ },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Urakointi', 'Yritys', 'Yhteystiedot']

export const PHONE = 'tel:+358400341377'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __wpReady?: boolean }).__wpReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Valikko' }).click()
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

export const introState = (page: Page) => page.locator('.hero-stage').getAttribute('data-intro')

/** stroke-dashoffset of the W line of the hero mark (0 = fully drawn, 1 = hidden). */
export const wOffset = (page: Page) =>
  page.evaluate(() => Number(getComputedStyle(document.querySelector('.hero-mark .mark-main')!).strokeDashoffset.replace('px', '')))
