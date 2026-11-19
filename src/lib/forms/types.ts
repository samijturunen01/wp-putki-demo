import type { ServiceId } from '../../data/services'

export type RequestKind = 'huolto' | 'urakka' | 'asbesti' | 'muu'
export type CustomerType = '' | 'taloyhtio' | 'yritys' | 'koti'
export type Timing = '' | 'pian' | '1-3kk' | 'myohemmin' | 'joustava'

/** Work order / quote request – what WP-Putki needs to route and price the job. */
export interface QuoteRequest {
  kind: RequestKind
  areas: ServiceId[]
  customer: CustomerType
  organisation: string
  location: string
  details: string
  timing: Timing
  name: string
  phone: string
  email: string
}

export type FieldErrors = Partial<Record<keyof QuoteRequest | 'contact', string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: QuoteRequest): Promise<SubmitResult>
}

export const emptyRequest = (kind: RequestKind = 'urakka', areas: ServiceId[] = []): QuoteRequest => ({
  kind,
  areas,
  customer: '',
  organisation: '',
  location: '',
  details: '',
  timing: '',
  name: '',
  phone: '',
  email: '',
})
