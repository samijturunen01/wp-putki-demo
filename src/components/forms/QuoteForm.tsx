import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, Check, Info, Phone, RotateCcw } from 'lucide-react'
import { emptyRequest, type CustomerType, type FieldErrors, type QuoteRequest, type RequestKind } from '../../lib/forms/types'
import { validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import { services, type ServiceId } from '../../data/services'
import { company, person, type Person } from '../../data/company'
import { track } from '../../lib/analytics'

const kinds: { id: RequestKind; label: string; hint: string }[] = [
  { id: 'huolto', label: 'Huolto- tai korjaustyö', hint: 'Työtilaus' },
  { id: 'urakka', label: 'Urakka tai saneeraus', hint: 'Tarjouspyyntö' },
  { id: 'asbesti', label: 'Asbesti tai haitta-aineet', hint: 'Kartoitus / purku' },
  { id: 'muu', label: 'Muu kysymys', hint: 'Kysy meiltä' },
]
const customers: { id: Exclude<CustomerType, ''>; label: string }[] = [
  { id: 'taloyhtio', label: 'Taloyhtiö / isännöitsijä' },
  { id: 'yritys', label: 'Yritys tai teollisuus' },
  { id: 'koti', label: 'Kotitalous' },
]
const contactFor: Record<RequestKind, Person['id'][]> = {
  huolto: [],
  urakka: ['arto', 'tuomas'],
  asbesti: ['mika'],
  muu: [],
}

const isKind = (v: string | null): v is RequestKind => !!v && kinds.some((k) => k.id === v)
const isArea = (v: string | null): v is ServiceId => !!v && services.some((s) => s.id === v)

/**
 * Work order / quote request. Delivery is a separate adapter (src/lib/forms/submit.ts):
 * the demo build never sends or stores anything.
 */
export function QuoteForm() {
  const [params] = useSearchParams()
  const [data, setData] = useState<QuoteRequest>(() => emptyRequest())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const started = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const fid = (n: string) => `${uid}-${n}`

  // Preselect from the URL after hydration (?aihe=urakka&ala=vesi) – prerendered HTML has no query.
  const aihe = params.get('aihe')
  const ala = params.get('ala')
  useEffect(() => {
    if (!isKind(aihe) && !isArea(ala)) return
    // Syncing with the URL after hydration is intentional (the prerendered HTML has no query).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((d) => ({
      ...d,
      kind: isKind(aihe) ? aihe : d.kind,
      areas: isArea(ala) && !d.areas.includes(ala) ? [...d.areas, ala] : d.areas,
    }))
  }, [aihe, ala])

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    track('form_start', { kind: data.kind })
  }
  const set = <K extends keyof QuoteRequest>(k: K, v: QuoteRequest[K]) => {
    onFirstInput()
    setData((d) => ({ ...d, [k]: v }))
    if (errors[k] || ((k === 'phone' || k === 'email') && errors.contact)) {
      setErrors((e) => {
        const n = { ...e }
        delete n[k]
        if (k === 'phone' || k === 'email') delete n.contact
        return n
      })
    }
  }
  const toggleArea = (id: ServiceId) => set('areas', data.areas.includes(id) ? data.areas.filter((a) => a !== id) : [...data.areas, id])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length) {
      track('form_validation_error', { fields: Object.keys(errs).join(',') })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(data)
      setMessage(res.message)
      setStatus('done')
      track('form_submit_success', { kind: data.kind, demo: res.demo })
      requestAnimationFrame(() => doneRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setData(emptyRequest(data.kind))
    setErrors({})
    setStatus('idle')
    started.current = false
  }

  const errorList = Object.entries(errors) as [keyof FieldErrors, string][]
  const target = (k: keyof FieldErrors) => (k === 'contact' ? fid('phone') : k === 'customer' ? fid('customer-taloyhtio') : fid(k))
  const callPeople = contactFor[data.kind]

  if (status === 'done') {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-[26px] border-2 border-flow-deep bg-white p-7 outline-none sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-flow text-ink">
          <Check size={28} aria-hidden="true" />
        </span>
        <p className="display-m mt-6 text-graphite">{message}</p>
        {isDemoMode() && (
          <p className="mt-4 max-w-[38rem] text-steel">
            Tämä on Hades Designin konseptidemo: lomake ei lähettänyt eikä tallentanut tietojasi. Tuotantoversiossa pyyntö välitetään WP-Putkelle.
            Kiireellisessä asiassa soita työtilaus{' '}
            <a href={company.phone.href} className="link-u num font-[650] text-graphite">
              {company.phone.display}
            </a>
            .
          </p>
        )}
        <button type="button" onClick={reset} className="btn btn-outline mt-8">
          <RotateCcw size={18} aria-hidden="true" /> Tee uusi pyyntö
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-10" aria-describedby={fid('demo')}>
      <p id={fid('demo')} className="flex gap-3 rounded-2xl bg-flow-wash px-4 py-3 text-[0.92rem] text-graphite">
        <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-flow-deep" />
        Konseptidemo: lomake ei lähetä eikä tallenna tietoja.
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-2xl border-2 border-[#c02a2a] bg-[#fff4f3] p-5 outline-none">
          <p className="flex items-center gap-2 font-[700] text-[#9b1c1c]">
            <AlertCircle size={19} aria-hidden="true" /> Tarkista {errorList.length === 1 ? 'yksi kohta' : `${errorList.length} kohtaa`}:
          </p>
          <ul className="mt-2 grid gap-1 pl-7 text-[0.95rem]">
            {errorList.map(([k, msg]) => (
              <li key={k}>
                <a href={`#${target(k)}`} className="link-u text-[#7f1717]" onClick={(e) => (e.preventDefault(), document.getElementById(target(k))?.focus())}>
                  {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Step n="1" title="Mistä on kyse?">
        <fieldset>
          <legend className="sr-only">Pyynnön tyyppi</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {kinds.map((k) => (
              <label key={k.id} className="pick is-radio !items-start !py-3.5">
                <input type="radio" name="kind" value={k.id} checked={data.kind === k.id} onChange={() => set('kind', k.id)} />
                <span className="tick mt-0.5">
                  <span className="size-2 rounded-full bg-white" />
                </span>
                <span>
                  {k.label}
                  <span className="block text-[0.84rem] font-[500] text-steel">{k.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {data.kind === 'huolto' && (
          <p className="mt-4 flex items-start gap-2.5 text-[0.95rem] text-steel">
            <Phone size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-flow-deep" />
            <span>
              Vika päällä? Työtilaus on nopeinta jättää puhelimella:{' '}
              <a href={company.phone.href} onClick={() => track('phone_click', { location: 'form' })} className="link-u num font-[650] text-graphite">
                {company.phone.display}
              </a>{' '}
              (arkisin 7.00–15.30).
            </span>
          </p>
        )}
      </Step>

      <Step n="2" title="Kohde">
        <fieldset aria-describedby={errors.customer ? fid('customer-err') : undefined}>
          <legend className="mb-3 font-[650] text-graphite">
            Kenen puolesta kysyt? <Req />
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {customers.map((c) => (
              <label key={c.id} className="pick is-radio">
                <input
                  id={fid(`customer-${c.id}`)}
                  type="radio"
                  name="customer"
                  value={c.id}
                  checked={data.customer === c.id}
                  onChange={() => set('customer', c.id)}
                  aria-invalid={!!errors.customer}
                />
                <span className="tick">
                  <span className="size-2 rounded-full bg-white" />
                </span>
                {c.label}
              </label>
            ))}
          </div>
          <FieldError id={fid('customer-err')} msg={errors.customer} />
        </fieldset>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {data.customer && data.customer !== 'koti' && (
            <Field id={fid('organisation')} label={data.customer === 'taloyhtio' ? 'Taloyhtiö' : 'Yritys'} optional>
              <input id={fid('organisation')} className="field" value={data.organisation} onChange={(e) => set('organisation', e.target.value)} autoComplete="organization" />
            </Field>
          )}
          <Field id={fid('location')} label="Kohteen sijainti" optional hint="Esim. kaupunginosa tai osoite">
            <input id={fid('location')} className="field" value={data.location} onChange={(e) => set('location', e.target.value)} autoComplete="street-address" placeholder="Esim. Rantakylä, Joensuu" />
          </Field>
        </div>

        <fieldset className="mt-6">
          <legend className="mb-3 font-[650] text-graphite">
            Mitä työ koskee? <span className="font-[500] text-steel">(valinnainen)</span>
          </legend>
          <div className="flex flex-wrap gap-2.5">
            {services.map((s) => (
              <label key={s.id} className="pick">
                <input type="checkbox" checked={data.areas.includes(s.id)} onChange={() => toggleArea(s.id)} />
                <span className="tick">{data.areas.includes(s.id) && <Check size={14} aria-hidden="true" />}</span>
                {s.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-5">
          <Field id={fid('details')} label="Kuvaus" required error={errors.details} hint="Mitä pitää tehdä, rakennusvuosi, laajuus, mahdolliset suunnitelmat">
            <textarea
              id={fid('details')}
              className="field"
              value={data.details}
              onChange={(e) => set('details', e.target.value)}
              aria-invalid={!!errors.details}
              aria-describedby={`${fid('details')}-hint${errors.details ? ` ${fid('details')}-err` : ''}`}
              rows={5}
            />
          </Field>
          <Field id={fid('timing')} label="Toivottu ajankohta" optional>
            <select id={fid('timing')} className="field" value={data.timing} onChange={(e) => set('timing', e.target.value as QuoteRequest['timing'])}>
              <option value="">Valitse…</option>
              <option value="pian">Mahdollisimman pian</option>
              <option value="1-3kk">1–3 kuukauden sisällä</option>
              <option value="myohemmin">Myöhemmin (suunnitteluvaihe)</option>
              <option value="joustava">Joustava</option>
            </select>
          </Field>
        </div>
      </Step>

      <Step n="3" title="Yhteystiedot">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fid('name')} label="Nimi" required error={errors.name} className="sm:col-span-2">
            <input id={fid('name')} className="field" value={data.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${fid('name')}-err` : undefined} />
          </Field>
          <Field id={fid('phone')} label="Puhelin" error={errors.phone}>
            <input
              id={fid('phone')}
              className="field num"
              type="tel"
              inputMode="tel"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              aria-invalid={!!(errors.phone || errors.contact)}
              aria-describedby={[errors.phone && `${fid('phone')}-err`, errors.contact && fid('contact-err')].filter(Boolean).join(' ') || undefined}
            />
          </Field>
          <Field id={fid('email')} label="Sähköposti" error={errors.email}>
            <input
              id={fid('email')}
              className="field"
              type="email"
              inputMode="email"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              aria-invalid={!!(errors.email || errors.contact)}
              aria-describedby={[errors.email && `${fid('email')}-err`, errors.contact && fid('contact-err')].filter(Boolean).join(' ') || undefined}
            />
          </Field>
        </div>
        <p className="mt-3 text-[0.9rem] text-steel">Anna vähintään toinen: puhelinnumero tai sähköposti.</p>
        <FieldError id={fid('contact-err')} msg={errors.contact} />
      </Step>

      <div className="flex flex-col gap-4 border-t border-[#c8d4dc] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[26rem] text-[0.9rem] text-steel">
          Tietoja käytetään vain yhteydenottoon vastaamiseen. <Req /> = pakollinen tieto.
        </p>
        <button type="submit" className="btn btn-primary sm:!px-9" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? 'Lähetetään…' : 'Lähetä pyyntö'}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-[#9b1c1c]">
          Lähetys ei onnistunut. Yritä uudelleen tai soita {company.phone.display}.
        </p>
      )}

      {callPeople.length > 0 && (
        <div className="rounded-2xl border border-[#c8d4dc] bg-white p-5">
          <p className="tag text-flow-deep">Haluatko soittaa suoraan?</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {callPeople.map((id) => {
              const p = person(id)
              return (
                <li key={id}>
                  <a href={`tel:${p.phone.tel}`} onClick={() => track('phone_click', { location: 'form_direct', person: id })} className="group flex min-h-12 flex-col justify-center">
                    <span className="font-[650] text-graphite group-hover:text-flow-deep">
                      {p.name} · <span className="num">{p.phone.display}</span>
                    </span>
                    <span className="text-[0.88rem] text-steel">{p.role}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </form>
  )
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-5 sm:grid-cols-[44px_1fr]" aria-label={`Vaihe ${n}: ${title}`}>
      <span aria-hidden="true" className="tag hidden size-11 place-items-center rounded-full border-2 border-flow-deep text-flow-deep sm:grid">
        {n}
      </span>
      <div>
        <h3 className="display-s mb-5 text-graphite">
          <span className="tag mr-2 text-flow-deep sm:hidden">{n}.</span>
          {title}
        </h3>
        {children}
      </div>
    </section>
  )
}

function Req() {
  return (
    <span className="text-[#b02222]" aria-hidden="true">
      *
    </span>
  )
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.92rem] font-[600] text-[#a31f1f]">
      <AlertCircle size={16} aria-hidden="true" className="mt-0.5 shrink-0" /> {msg}
    </p>
  )
}

function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-[650] text-graphite">
        {label} {required && <Req />}
        {required && <span className="sr-only">(pakollinen)</span>}
        {optional && <span className="font-[500] text-steel">(valinnainen)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 mb-2 text-[0.88rem] text-steel">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`${id}-err`} msg={error} />
    </div>
  )
}
