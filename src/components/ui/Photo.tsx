import type { CSSProperties, ImgHTMLAttributes } from 'react'
import photoSizes from '../../data/photoSizes.json'
import { asset } from '../../lib/asset'

type Sizes = Record<string, { w: number; h: number; widths: number[] }>
const table = photoSizes as Sizes

export const photoSrc = (key: string, width = 960) => {
  const s = table[key]
  if (!s) throw new Error(`Unknown photo "${key}"`)
  const w = s.widths.find((x) => x >= width) ?? s.widths[s.widths.length - 1]
  return asset(`images/p/${key}-${w}.webp`)
}

export const photoRatio = (key: string) => table[key].w / table[key].h

interface PhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  k: string
  alt: string
  /** Load immediately with high priority (hero / LCP images). */
  priority?: boolean
  position?: string
}

/** Authentic, responsive WebP photo with intrinsic size (prevents layout shift). */
export function Photo({ k, alt, priority, position, sizes = '100vw', style, className, ...rest }: PhotoProps) {
  const s = table[k]
  if (!s) throw new Error(`Unknown photo "${k}"`)
  const srcSet = s.widths.map((w) => `${asset(`images/p/${k}-${w}.webp`)} ${w}w`).join(', ')
  return (
    <img
      src={photoSrc(k, 960)}
      srcSet={srcSet}
      sizes={sizes}
      width={s.w}
      height={s.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={{ objectPosition: position, ...(style as CSSProperties) }}
      {...rest}
    />
  )
}
