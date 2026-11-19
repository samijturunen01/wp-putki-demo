/**
 * Lab performance check (NOT real-user data): loads pages in Chromium with
 * 4× CPU slowdown and a "fast 3G / slow 4G"-like network, then reads LCP, CLS,
 * FCP and total transfer size from the Performance APIs.
 * Usage: node scripts/perf-lab.mjs <baseUrl> [path ...]
 */
import { chromium } from '@playwright/test'

const [base, ...paths] = process.argv.slice(2)
const list = paths.length ? paths : ['', 'palvelut/', 'palvelut/vesi/', 'urakointi/', 'yhteystiedot/']
const browser = await chromium.launch({ channel: process.env.CI ? undefined : 'chrome' })

for (const mobile of [true, false]) {
  for (const p of list) {
    const ctx = await browser.newContext(
      mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } },
    )
    const page = await ctx.newPage()
    const cdp = await ctx.newCDPSession(page)
    await cdp.send('Network.enable')
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    })
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: mobile ? 4 : 1 })
    await page.addInitScript(() => {
      const w = window
      w.__lcp = 0
      w.__cls = 0
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) w.__lcp = e.startTime
      }).observe({ type: 'largest-contentful-paint', buffered: true })
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) w.__cls += e.value
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.goto(base + p, { waitUntil: 'load' })
    await page.waitForTimeout(3500)
    const m = await page.evaluate(() => ({
      lcp: Math.round(window.__lcp),
      cls: Number(window.__cls.toFixed(3)),
      fcp: Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0),
      kb: Math.round(performance.getEntriesByType('resource').reduce((s, r) => s + (r.transferSize || 0), 0) / 1024 + (performance.getEntriesByType('navigation')[0]?.transferSize || 0) / 1024),
    }))
    console.log(`${mobile ? 'mobile ' : 'desktop'} /${p.padEnd(16)} FCP ${String(m.fcp).padStart(5)} ms  LCP ${String(m.lcp).padStart(5)} ms  CLS ${m.cls}  transfer ${m.kb} kB`)
    await ctx.close()
  }
}
await browser.close()
