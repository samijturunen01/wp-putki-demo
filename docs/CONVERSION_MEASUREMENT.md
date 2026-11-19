# Conversion measurement plan (future production)

Nothing is tracked in the demo: `src/lib/analytics.ts` only logs events to the console in development.
No cookies, pixels or third-party requests are made (verified by `tests/pages.spec.ts`).

## Primary conversion metric
**Qualified requests per month** = successful form submissions (`form_submit_success`) whose request type is
`urakka`, `asbesti` or `huolto` + phone clicks to the work-order line (`phone_click`, location ≠ footer) –
reported separately. Only WP-Putki can confirm which became quotes, orders and revenue (CRM/manual tagging).

Keep these apart: micro-conversions (clicks, form starts) ≠ qualified inquiries ≠ quotes sent ≠ won jobs ≠ revenue.

## Event definitions

| Event | When | Params (no personal data) |
|---|---|---|
| `cta_click` | Any "Pyydä tarjous"-type CTA | `location`, `label` (request kind) |
| `phone_click` | Any `tel:` link | `location`, `person` (id) / `service` |
| `email_click` | Any `mailto:` link | `location`, `person` |
| `router_select` | "Kenelle soitan?" option | `location`, `option` |
| `service_interest` | Link to a service page | `location`, `service` |
| `form_start` | First input in the request form | `kind` |
| `form_validation_error` | Submit with errors | `fields` (names only) |
| `form_submit_success` | Successful submit | `kind`, `demo` |
| `directions_click` | "Katso reittiohjeet" | – |
| `map_load` | Click-to-load map | – |
| `reviews_click` | "Lue arviot Googlessa" | `location` |

## Implementation requirements
- Consent management (CMP) before any analytics cookies; GA4/GTM only after consent, or a cookieless privacy-friendly tool (e.g. Plausible-type) – customer's choice.
- Privacy policy (tietosuojaseloste) and form data handling description before launch.
- Form delivery via Google Apps Script with server-side reCAPTCHA verification (`src/lib/forms/submit.ts` adapter is ready; secret key only in Apps Script).
- Call tracking: count `phone_click` only as intent, not as a completed call.

## Baseline to capture before launch
Current monthly contact form messages and phone work orders (from WP-Putki), share of urakka vs. small jobs, and top landing pages from Search Console if available.

## Optimisation ideas after launch
1. Hero headline variants (location-first vs. slogan-first).
2. CTA wording "Pyydä tarjous" vs. "Jätä tarjouspyyntö".
3. Form: 3-step layout vs. shorter variant for kotitaloudet.
4. Router default option (huolto vs. urakka) by device.
5. Asbestos page conversion with/without a permit/credential badge (once verified).
