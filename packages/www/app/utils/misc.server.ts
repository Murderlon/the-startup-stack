import { getClientLocales } from 'remix-utils/locales/server'
import { CURRENCIES } from '@company/core/src/constants'

export function getDomainUrl(request: Request) {
  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('Host')
  if (!host) return null

  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export function getDomainPathname(request: Request) {
  const pathname = new URL(request.url).pathname
  if (!pathname) return null
  return pathname
}

/**
 * Locales.
 */
export function getLocaleByQuality(request: Request) {
  const locales = getClientLocales(request)

  if (!locales) return 'en'
  return locales[1]
}

export function getLocaleCurrency(request: Request) {
  const locales = getClientLocales(request)
  if (!locales) return CURRENCIES.DEFAULT

  return locales.find((locale) => locale === 'en-US') ? CURRENCIES.USD : CURRENCIES.EUR
}

/**
 * Combines multiple header objects into one (Headers are appended not overwritten).
 */
export function combineHeaders(
  ...headers: Array<ResponseInit['headers'] | null | undefined>
) {
  const combined = new Headers()
  for (const header of headers) {
    if (!header) continue
    for (const [key, value] of new Headers(header).entries()) {
      combined.append(key, value)
    }
  }
  return combined
}
