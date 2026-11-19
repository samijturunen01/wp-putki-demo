# Conversion strategy – WP-Putki

## Customer segments
1. **Taloyhtiöt / isännöitsijät / rakennuttajat** – largest jobs (linjasaneeraus, lämmönjakokeskus, IV-urakat, haitta-ainetyöt). Buy through RFQs; compare 2–4 contractors; need credibility, scope clarity, named contacts and the ability to do the whole job.
2. **Yritykset ja teollisuus** – installations, maintenance, measurements, hazardous-material work in premises. Need reliability, invoicing clarity (e-invoice details), one contact.
3. **Kotitaloudet** – small repairs (hana, WC, vuoto), heat pumps, IV-koneen huolto, asbestikartoitus before a bathroom renovation. Usually *call*; need to know they are served and when to call.
4. **Tiliasiakkaat (store)** – existing trade customers; need hours, address, contact.

## Main pain points
- "Who do I call?" (five contacts, no guidance on the old site)
- "Do you do my kind of job / my kind of building?"
- "Pre-1994 building – do I need an asbestos survey, and who does it?"
- "What will it cost?" (no prices available – explain how pricing works instead)
- Urgent leaks: when can I reach someone?

## Verified business strengths
Since 1989 in Joensuu · lämpö + vesi + ilma + asbesti/haitta-aineet under one roof · named people for contracting, asbestos, invoicing · own fleet and store at Ukkolantie 25 · positive (anonymous) customer feedback on the old site.

## Conversion goals
- **Primary:** qualified request – *tarjouspyyntö / työtilaus* through the form, or a tap-to-call to the work-order line 040 034 1377 (both treated as the primary action: "Pyydä tarjous" + "Soita työtilaus").
- **Secondary:** call a named specialist (urakkalaskenta, asbesti), view a service page, open directions, read Google reviews.

## Customer journey
Hero (what/where/who + CTA) → "Kenelle soitan?" router (instant routing) → four service lines on one riser (scope) → segments (relevance) → authentic fleet/store (credibility) → customer feedback → FAQ (objections: price, area, asbestos, store) → closing CTA. Every service page repeats: need → scope → contact → FAQ → CTA with preselected form.

## Conversion barriers addressed
| Barrier | Solution |
|---|---|
| Unclear offer above the fold | H1 + lead state services, area, segments, year |
| Phone not tappable on old site | `tel:` links everywhere, mobile action bar |
| Unclear contact routing | NeedRouter + contact groups + per-service contact cards |
| Unqualified messages | Request type, customer type, location, scope and timing fields |
| No pricing | FAQ explains quote-based pricing + RFQ checklist |
| Store confusion | Account-customer restriction stated consistently |
| Missing trust signals | 1989, fleet/store photos, quotes, Google reviews link, Y-tunnus, invoicing data |

## Hypotheses (to be measured – not proven)
1. Showing the right named contact per situation increases direct calls to specialists and shortens routing.
2. Service-specific pages with preselected CTAs increase form starts on service landing traffic.
3. The asbestos + LVI "one contractor" message increases urakka RFQs from housing companies with pre-1994 buildings.
4. The mobile action bar increases phone clicks per mobile session.
5. Adding request/customer type fields increases the share of qualified leads without reducing completion significantly.

## Measurement
See `docs/CONVERSION_MEASUREMENT.md` (events prepared in `src/lib/analytics.ts`, inactive in the demo).
