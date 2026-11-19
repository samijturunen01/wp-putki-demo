import type { ServiceId } from './services'
import type { RequestKind } from '../lib/forms/types'

/** Main navigation – "Etusivu" is always first (desktop and mobile). */
export const nav = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/urakointi', label: 'Urakointi' },
  { to: '/yritys', label: 'Yritys' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
] as const

/** Link to the request form with the request type (and service area) preselected. */
export const quoteHref = (kind?: RequestKind, area?: ServiceId) => {
  const q = new URLSearchParams()
  if (kind) q.set('aihe', kind)
  if (area) q.set('ala', area)
  const s = q.toString()
  return `/yhteystiedot${s ? `?${s}` : ''}#tarjouspyynto`
}
