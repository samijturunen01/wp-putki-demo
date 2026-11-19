import { expect, test } from '@playwright/test'
import { PHONE, ready, url } from './helpers'

test('request form validates, keeps input and shows the demo confirmation without sending anything', async ({ page }) => {
  const posts: string[] = []
  page.on('request', (r) => {
    if (r.method() !== 'GET') posts.push(r.url())
  })
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  const form = page.locator('form')
  await form.getByLabel(/^Kuvaus/).fill('Kerrostalon lämmönjakokeskuksen uusinta, rakennettu 1978.')
  await form.getByRole('button', { name: 'Lähetä pyyntö' }).click()
  // error summary lists the missing items and gets focus
  const alert = form.getByRole('alert')
  await expect(alert).toBeFocused()
  await expect(alert).toContainText('Valitse, kenen puolesta kysyt')
  await expect(alert).toContainText('Kirjoita nimesi')
  await expect(alert).toContainText('puhelinnumero tai sähköposti')
  // input is preserved
  await expect(form.getByLabel(/^Kuvaus/)).toHaveValue(/lämmönjakokeskuksen uusinta/)
  // the error summary links move focus to the field
  await alert.getByRole('link', { name: /Kirjoita nimesi/ }).click()
  await expect(form.getByLabel(/^Nimi/)).toBeFocused()
  await form.getByRole('radio', { name: /Taloyhtiö \/ isännöitsijä/ }).check()
  // organisation field appears for housing companies
  await expect(form.getByRole('textbox', { name: /^Taloyhtiö/ })).toBeVisible()
  await form.getByLabel(/^Nimi/).fill('Testi Isännöitsijä')
  await form.getByLabel('Sähköposti').fill('virhe@')
  await form.getByRole('button', { name: 'Lähetä pyyntö' }).click()
  await expect(form.getByRole('alert')).toContainText('Tarkista sähköpostiosoite')
  await form.getByLabel('Sähköposti').fill('testi@example.com')
  await form.getByRole('button', { name: 'Lähetä pyyntö' }).click()
  await expect(page.getByRole('status')).toContainText('Demoversio – viestiä ei lähetetty.')
  expect(posts).toEqual([])
  expect(await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)).toBe(0)
})

test('request type shows the right people to call directly', async ({ page }) => {
  await page.goto(url('yhteystiedot/?aihe=urakka#tarjouspyynto'))
  await ready(page)
  const form = page.locator('form')
  await expect(form.getByRole('radio', { name: /Urakka tai saneeraus/ })).toBeChecked()
  await expect(form.getByRole('link', { name: /Arto Korhonen/ })).toHaveAttribute('href', 'tel:+358503850540')
  await form.getByRole('radio', { name: /Asbesti tai haitta-aineet/ }).check()
  await expect(form.getByRole('link', { name: /Mika Heinonen/ })).toHaveAttribute('href', 'tel:+358407277961')
  await form.getByRole('radio', { name: /Huolto- tai korjaustyö/ }).check()
  await expect(form.getByRole('link', { name: '040 034 1377' })).toHaveAttribute('href', PHONE)
})

test('"Kenelle soitan?" router switches contacts with mouse and keyboard', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const tabs = page.getByRole('tablist', { name: 'Valitse asia' })
  const panel = page.getByRole('tabpanel')
  await expect(panel.getByRole('link', { name: /040 034 1377/ })).toHaveAttribute('href', PHONE)
  await tabs.getByRole('tab', { name: /Asbesti tai haitta-aineet/ }).click()
  await expect(panel).toContainText('Mika Heinonen')
  await expect(panel.getByRole('link', { name: /040 727 7961/ })).toHaveAttribute('href', 'tel:+358407277961')
  await page.keyboard.press('ArrowDown')
  await expect(tabs.getByRole('tab', { name: /Myymälä ja tiliasiakkuus/ })).toBeFocused()
  await expect(tabs.getByRole('tab', { name: /Myymälä ja tiliasiakkuus/ })).toHaveAttribute('aria-selected', 'true')
  await expect(panel).toContainText('vain tiliasiakkaille')
  await page.keyboard.press('ArrowDown')
  await expect(panel).toContainText('Helmi Burman')
})

test('the services riser fills and opens its valves while scrolling', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const nodes = page.locator('[data-node]')
  await expect(nodes).toHaveCount(4)
  await expect(nodes.first()).toHaveAttribute('data-open', 'false')
  await nodes.first().scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy(0, 200))
  await expect(nodes.first()).toHaveAttribute('data-open', 'true')
  await nodes.last().scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy(0, 400))
  await expect(nodes.last()).toHaveAttribute('data-open', 'true')
})

test('map loads from Google only after the visitor asks for it; directions link is correct', async ({ page }) => {
  const google: string[] = []
  page.on('request', (r) => {
    if (/google\./.test(new URL(r.url()).hostname)) google.push(r.url())
  })
  await page.goto(url('yhteystiedot/#kartta'))
  await ready(page)
  await expect(page.getByRole('link', { name: /Katso reittiohjeet/ })).toHaveAttribute('href', /maps\/dir\/\?api=1&destination=WP-Putki%20Oy%2C%20Ukkolantie%2025%2C%2080130%20Joensuu/)
  expect(google).toEqual([])
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  await expect(page.locator('iframe[title^="Kartta"]')).toHaveAttribute('src', /Ukkolantie%2025/)
})

test('people have click-to-call and e-mail links', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  for (const [tel, mail] of [
    ['tel:+358503850540', 'mailto:arto.korhonen@wp-putki.fi'],
    ['tel:+358503825029', 'mailto:tuomas.mononen@wp-putki.fi'],
    ['tel:+358407277961', 'mailto:mika.heinonen@wp-putki.fi'],
    ['tel:+358503773603', 'mailto:helmi.burman@wp-putki.fi'],
    ['tel:+358505750196', 'mailto:petri.burman@wp-putki.fi'],
  ]) {
    await expect(page.locator(`a[href="${tel}"]`).first()).toBeAttached()
    await expect(page.locator(`a[href="${mail}"]`).first()).toBeAttached()
  }
})

test('FAQ answers open and close', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const q = page.locator('summary', { hasText: 'Millä alueella toimitte?' })
  await q.click()
  await expect(page.getByText('Joensuussa ja sen lähialueilla').last()).toBeVisible()
  await q.click()
  await expect(page.locator('details', { has: q })).not.toHaveAttribute('open', '')
})
