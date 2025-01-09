import { User } from '@company/core/src/user/index'
import { createClient } from '@openauthjs/openauth/client'
import { createCookie, redirect } from 'react-router'
import { Authenticator } from 'remix-auth'
import { OpenAuthStrategy } from 'remix-auth-openauth'
import { Resource } from 'sst'
import { ROUTE_PATH as LOGOUT_PATH } from '#app/routes/auth+/logout'
import { combineHeaders } from '#app/utils/misc.server.ts'

export const openauth = createClient({
  clientID: 'web',
  issuer: Resource.Auth.url,
})

export const refreshTokenCookie = createCookie('refresh_token', {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 34560000,
  secure: process.env.NODE_ENV === 'production',
})

export const accessTokenCookie = createCookie('access_token', {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 34560000,
  secure: process.env.NODE_ENV === 'production',
})

export async function setTokens(access: string, refresh: string) {
  // biome-ignore lint/style/noNonNullAssertion: guaranteed fine
  return combineHeaders(
    { 'Set-Cookie': await accessTokenCookie.serialize(access) },
    { 'Set-Cookie': await refreshTokenCookie.serialize(refresh) },
  ).get('Set-Cookie')!
}

export async function removeTokens() {
  // biome-ignore lint/style/noNonNullAssertion: guaranteed fine
  return combineHeaders(
    { 'Set-Cookie': await accessTokenCookie.serialize('', { maxAge: 1 }) },
    { 'Set-Cookie': await refreshTokenCookie.serialize('', { maxAge: 1 }) },
  ).get('Set-Cookie')!
}

export const authenticator = new Authenticator<User.info>()

authenticator.use(
  new OpenAuthStrategy(
    {
      clientId: 'web',
      redirectUri: `${process.env.HOST_URL}/auth/callback`,
      issuer: Resource.Auth.url,
    },
    async ({ client, tokens }) => {
      const verified = await client.verify(User.subjects, tokens.access, {
        refresh: tokens.refresh,
      })
      if (verified.err) {
        throw verified.err
      }
      return verified.subject.properties
    },
  ),
  'openauth',
)

export async function requireUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  try {
    return authenticator.authenticate('openauth', request)
  } catch (err) {
    console.error('requireUser', err)
    if (!redirectTo) throw redirect(LOGOUT_PATH)
    throw redirect(redirectTo)
  }
}
