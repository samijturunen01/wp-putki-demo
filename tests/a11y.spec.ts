import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { ready, routes, url } from './helpers'

/**
 * Automated WCAG 2.2 A/AA checks (axe-core). Automated testing does not replace a
 * manual accessibility review – see docs/PROJECT_STATUS.md for manual findings.
 */
for (const r of [...routes, { path: 'ei-loydy/', h1: /./ }]) {
  test(`axe: /${r.path}`, async ({ page }) => {
    await page.goto(url(r.path))
    await ready(page)
    // let the intro + reveals settle so colours are measured in their final state
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y)
        await new Promise((res) => setTimeout(res, 30))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(2600)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`),
    ).toEqual([])
  })
}
