/**
 * Conversion event layer – prepared for a future, consented analytics setup
 * (GA4 / GTM / privacy-friendly alternative). In the demo NOTHING is sent and
 * no cookies are set: events are only logged to the console in development.
 * Never pass personal data (names, phone numbers, emails, free text) here.
 * Event definitions: docs/CONVERSION_MEASUREMENT.md
 */
export type ConversionEvent =
  | 'cta_click'
  | 'phone_click'
  | 'email_click'
  | 'form_start'
  | 'form_submit_success'
  | 'form_validation_error'
  | 'service_interest'
  | 'router_select'
  | 'directions_click'
  | 'map_load'
  | 'reviews_click'

export function track(event: ConversionEvent, params: Record<string, string | number | boolean> = {}) {
  if (import.meta.env.DEV) console.debug('[track]', event, params)
  // Production hook (only after consent): window.dataLayer?.push({ event, ...params })
}
