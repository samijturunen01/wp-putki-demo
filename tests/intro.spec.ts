import { expect, test } from '@playwright/test'
import { introState, openNav, ready, url, wOffset } from './helpers'

test('logo intro plays on a full homepage load – headline and CTA are usable immediately', async ({ page }) => {
  await page.goto(url(), { waitUntil: 'commit' })
  await page.waitForSelector('h1')
  // The value proposition and the primary CTA are there before the app even boots.
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.getByRole('link', { name: /Pyydä tarjous/ }).first()).toBeVisible()
  await ready(page)
  // The pipe is being laid: the W is only partly drawn.
  await expect.poll(() => introState(page)).toBe('playing')
  expect(await wOffset(page)).toBeGreaterThan(0)
  // … and it completes: whole mark drawn, indicator lit.
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  expect(await wOffset(page)).toBe(0)
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.hero-mark .mark-pill')!).opacity)).toBe('1')
})

test('intro plays again after a browser refresh (no storage suppression)', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  await page.reload()
  await ready(page)
  await expect.poll(() => introState(page)).toBe('playing')
  const storage = await page.evaluate(() => localStorage.length + sessionStorage.length + document.cookie.length)
  expect(storage).toBe(0)
})

test('intro does not replay when returning home through the menu', async ({ page }) => {
  await page.goto(url('urakointi/'))
  await ready(page)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Etusivu/ }).click()
  await expect(page).toHaveURL(/wp-putki-demo\/?$/)
  await expect.poll(() => introState(page)).toBe('skipped')
  expect(await wOffset(page)).toBe(0)
})

test('intro does not replay on browser back to the homepage', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Palvelut/ }).click()
  await expect(page).toHaveURL(/palvelut\/?$/)
  await page.goBack()
  await expect.poll(() => introState(page)).toMatch(/^(skipped|done)$/)
  expect(await wOffset(page)).toBe(0)
})

test('the hero does not shift layout while the intro runs', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const before = await page.locator('.hero-frame').boundingBox()
  const h1Before = await page.locator('h1').boundingBox()
  await expect.poll(() => introState(page), { timeout: 6000 }).toBe('done')
  const after = await page.locator('.hero-frame').boundingBox()
  const h1After = await page.locator('h1').boundingBox()
  expect(Math.abs((before?.y ?? 0) - (after?.y ?? 0))).toBeLessThan(1)
  expect(Math.abs((before?.height ?? 0) - (after?.height ?? 0))).toBeLessThan(1)
  expect(Math.abs((h1Before?.y ?? 0) - (h1After?.y ?? 0))).toBeLessThan(1)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no intro and all content immediately in its final state', async ({ page }) => {
    await page.goto(url())
    expect(await page.evaluate(() => document.documentElement.classList.contains('intro-pending'))).toBe(false)
    await ready(page)
    await expect.poll(() => introState(page)).toBe('skipped')
    expect(await wOffset(page)).toBe(0)
    await expect(page.locator('h1')).toBeVisible()
    const reveal = await page.evaluate(() => getComputedStyle(document.querySelector('[data-reveal]')!).opacity)
    expect(reveal).toBe('1')
    // The riser is shown full with every valve open.
    await expect(page.locator('[data-node][data-open="true"]')).toHaveCount(4)
  })
})
