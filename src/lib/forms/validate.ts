import type { FieldErrors, QuoteRequest } from './types'

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE = /^\+?[0-9 ()-]{6,20}$/

/** Client-side validation. A future backend must validate again server-side. */
export function validate(d: QuoteRequest): FieldErrors {
  const e: FieldErrors = {}
  if (!d.customer) e.customer = 'Valitse, kenen puolesta kysyt – se auttaa ohjaamaan pyynnön oikealle henkilölle.'
  if (d.details.trim().length < 10) e.details = 'Kerro lyhyesti, mitä kohteessa pitää tehdä (vähintään 10 merkkiä).'
  if (d.details.length > 3000) e.details = 'Viesti on liian pitkä (enintään 3000 merkkiä).'
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  const phone = d.phone.trim()
  const email = d.email.trim()
  if (!phone && !email) e.contact = 'Anna puhelinnumero tai sähköposti, jotta sinuun voidaan olla yhteydessä.'
  if (phone && !PHONE.test(phone)) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (email && !EMAIL.test(email)) e.email = 'Tarkista sähköpostiosoite (esim. nimi@esimerkki.fi).'
  return e
}
