import { createClient } from '@openauthjs/openauth/client'
import { createCookie, redirect } from '@remix-run/node'
import { Resource } from 'sst'
import { User } from '@company/core/src/user/index'
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
  // TODO: return Set-Cookie instead of `Headers`
  return combineHeaders(
    { 'Set-Cookie': await accessTokenCookie.serialize(access) },
    { 'Set-Cookie': await refreshTokenCookie.serialize(refresh) },
  )
}

export async function removeTokens() {
  return combineHeaders(
    { 'Set-Cookie': await accessTokenCookie.serialize('', { maxAge: 1 }) },
    { 'Set-Cookie': await refreshTokenCookie.serialize('', { maxAge: 1 }) },
  )
}

export const callbackURL = `${process.env.HOST_URL}/auth/callback`

export async function getLoginUrl() {
  return (await openauth.authorize(callbackURL, 'code')).url
}

export async function optionalUser(request: Request) {
  const cookieHeader = request.headers.get('Cookie')
  const accessToken = await accessTokenCookie.parse(cookieHeader)

  if (accessToken) {
    const refreshToken = await refreshTokenCookie.parse(cookieHeader)
    const verified = await openauth.verify(User.subjects, accessToken.value, {
      refresh: refreshToken?.value,
    })
    if (verified.err) {
      throw verified.err
    }
    if (verified.tokens) {
      return verified.subject.properties
    }
  }
}

export async function requireUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  try {
    const user = await optionalUser(request)
    if (user) return user
  } catch (err) {
    console.error('requireUser', err)
  }

  throw redirect(await getLoginUrl())
}
