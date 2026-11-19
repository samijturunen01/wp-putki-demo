import type { QuoteRequest, FormAdapter, SubmitResult } from './types'

/**
 * Form delivery, kept separate from the UI.
 *
 * DEMO (default): nothing leaves the browser and nothing is stored.
 * PRODUCTION (later, after customer approval): set VITE_FORM_MODE=apps-script and
 * VITE_FORM_ENDPOINT to a Google Apps Script web app. reCAPTCHA v3 uses only the
 * public SITE key here (VITE_RECAPTCHA_SITE_KEY); the token must be verified
 * server-side in Apps Script with the secret key, which never belongs in this repo.
 */
const demoAdapter: FormAdapter = {
  async submit() {
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, demo: true, message: 'Demoversio – viestiä ei lähetetty.' }
  },
}

declare global {
  interface Window {
    grecaptcha?: { ready(cb: () => void): void; execute(key: string, opts: { action: string }): Promise<string> }
  }
}

/** Prepared for production. Not active in the demo build. */
const appsScriptAdapter = (endpoint: string, siteKey?: string): FormAdapter => ({
  async submit(data: QuoteRequest): Promise<SubmitResult> {
    let token = ''
    if (siteKey && window.grecaptcha) {
      token = await new Promise<string>((resolve) =>
        window.grecaptcha!.ready(() => window.grecaptcha!.execute(siteKey, { action: 'work_request' }).then(resolve)),
      )
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      // text/plain avoids a CORS preflight with Apps Script web apps
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...data, recaptchaToken: token }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = (await res.json()) as { ok?: boolean }
    if (!json.ok) throw new Error('Rejected')
    return { ok: true, demo: false, message: 'Kiitos! Viestisi on vastaanotettu.' }
  },
})

export function getFormAdapter(): FormAdapter {
  const mode = import.meta.env.VITE_FORM_MODE ?? 'demo'
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT
  if (mode === 'apps-script' && endpoint) return appsScriptAdapter(endpoint, import.meta.env.VITE_RECAPTCHA_SITE_KEY)
  return demoAdapter
}

export const isDemoMode = () => (import.meta.env.VITE_FORM_MODE ?? 'demo') !== 'apps-script' || !import.meta.env.VITE_FORM_ENDPOINT
