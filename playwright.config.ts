import { defineConfig, devices } from '@playwright/test'

/**
 * Tests run against the production build served like GitHub Pages
 * (run `npm run build` first). Base path: /wp-putki-demo/.
 * LIVE_URL=https://samijturunen01.github.io runs the suite against the deployed demo.
 */
// Locally the installed Chrome is used (bundled Playwright browsers may be outdated); CI installs Chromium.
const channel = process.env.CI ? undefined : 'chrome'

export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.LIVE_URL || 'http://127.0.0.1:4331',
    trace: 'retain-on-failure',
  },
  webServer: process.env.LIVE_URL
    ? undefined
    : {
        command: 'node scripts/serve-dist.mjs 4331',
        url: 'http://127.0.0.1:4331/wp-putki-demo/',
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel } },
  ],
})
