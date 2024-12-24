import { useEffect } from 'react'
import { useRevalidator } from 'react-router'
import { subscribeToSchemeChange } from '@epic-web/client-hints/color-scheme'
import { hintsUtils } from '#app/utils/hooks/use-hints'

/**
 * Injects an inline script that checks/sets CH Cookies (if not present).
 * Reloads the page if any Cookie was set to an inaccurate value.
 */
export function ClientHintCheck({ nonce }: { nonce: string }) {
  const { revalidate } = useRevalidator()
  useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate])

  return (
    <script
      nonce={nonce}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: It's fine
      dangerouslySetInnerHTML={{
        __html: hintsUtils.getClientHintCheckScript(),
      }}
    />
  )
}
