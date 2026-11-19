# Audit of wp-putki.fi and redesign improvements

## What the current site does well
- Clear four-way service split (Lämpö, Vesi, Ilma, Asbesti) and an honest services page.
- Named contact people with direct numbers and e-mails – a genuine trust asset.
- Strong slogan ("Varmasti linjassaan!") and a distinctive logo.

## Weaknesses found

| Area | Finding | Commercial impact |
|---|---|---|
| First impression | Generic Divi layout; hero is a dark photo with "WP-Putki / Varmasti linjassaan!" – no statement of *what* and *where* above the fold | Visitor must scroll to learn it is an LVI contractor in Joensuu |
| Value proposition | Copy is generic ("innovatiivisiin LVI-ratkaisuihin", "täydellisesti sinulle sopivan ratkaisun") | No reason to choose WP-Putki over others |
| Services | Homepage tiles all link to the same /palvelut page; no service-specific pages | Weak SEO for "linjasaneeraus Joensuu", "asbestikartoitus Joensuu" etc.; no service-level CTA |
| CTA | One "Ota yhteyttä!" button; the footer phone number links to a **Google search** instead of `tel:` | Mobile visitors cannot tap to call |
| Contact routing | Five people listed without guidance; first heading duplicates Arto Korhonen | Visitor does not know whom to call |
| Contact form | Name/phone/e-mail/message only – no request type, customer type or location | Unqualified leads, slow routing |
| Trust | Four anonymous one-line quotes; no history, fleet or premises shown; logo-less hero | Low credibility for housing-company buyers |
| Imagery | Divi demo stock still in the media library; authentic fleet/store photos used only as backgrounds | Authentic assets are wasted |
| Information accuracy | Store hours in footer vs. "vain tiliasiakkaille" note on /palvelut | Confusing for walk-in customers |
| Typography/brand | Theme default fonts (Abril Fatface, Playfair, Poppins) unrelated to the monoline logo | Brand feels assembled, not designed |
| SEO | One generic title per page, no structured data, no local landing content per service | Missed local search intent |
| Mobile | Sticky header, but no persistent call/quote actions | Friction for the most common mobile action (calling) |
| Map / directions | No map or directions link | Account customers visiting the store have to search |

## Improvements implemented in the demo

1. **Hero says what, for whom and where** – "LVI-työt Joensuussa – varmasti linjassaan." with lämpö/vesi/ilma/asbesti, customer types and "vuodesta 1989"; primary CTA + click-to-call work-order line visible on first paint.
2. **Signature logo animation** ("Painekoe") built from the authentic logo recreated as vector strokes – never blocks the page.
3. **"Kenelle soitan?" contact router** – choose the situation, get the right named person and a tap-to-call link.
4. **Dedicated service pages** (lämpö, vesi, ilma, asbesti) with need, scope, segments, FAQ, contact person and preselected CTA.
5. **Urakointi page** for housing companies and businesses: scope, renovation phases, RFQ checklist, contacts.
6. **Qualifying request form** (3 steps: request type → site → contact) with preselection from every CTA, demo-safe adapter.
7. **Trust**: founding year, authentic fleet and store photos, verbatim customer quotes, link to Google reviews, transparent people list and invoicing data.
8. **Accuracy**: store restriction shown everywhere the store is mentioned; no prices, guarantees or response times invented.
9. **Local SEO**: unique titles/descriptions, prerendered HTML per route, `HVACBusiness`/`Plumber` JSON-LD, FAQ and breadcrumb data, sitemap.
10. **Mobile**: persistent "Soita / Pyydä tarjous" bar, large touch targets, click-to-load map with directions.
