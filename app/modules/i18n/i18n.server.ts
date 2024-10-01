import { createCookie } from '@remix-run/node'
import { RemixI18Next } from 'remix-i18next/server'

import * as i18n from '#app/modules/i18n/i18n'
import { isPermanentStage } from '#infra/stage.ts'

export const localeCookie = createCookie('lng', {
  path: '/',
  sameSite: 'lax',
  secure: isPermanentStage,
  httpOnly: true,
})

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
  },
  // Configuration for i18next used when
  // translating messages server-side only.
  i18next: {
    ...i18n,
  },
})
