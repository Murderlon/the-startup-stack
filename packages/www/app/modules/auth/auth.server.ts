import { User } from '@company/core/src/user/index'
import { createCookieSessionStorage, redirect } from 'react-router'
import { Authenticator } from 'remix-auth'
import { OpenAuthStrategy } from 'remix-auth-openauth'
import { Resource } from 'sst'

type SessionData = {
  user: User.info
}

type SessionFlashData = {
  error: string
}

export const AUTH_SESSION_KEY = '_auth'
export const authSessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: AUTH_SESSION_KEY,
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secrets: [Resource.SESSION_SECRET.value || 'NOT_A_STRONG_SECRET'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = authSessionStorage

export const authenticator = new Authenticator<User.info>()

authenticator.use(
  new OpenAuthStrategy(
    {
      clientId: 'web',
      redirectUri: `${process.env.HOST_URL}/auth/callback`,
      issuer: Resource.Auth.url,
    },
    async ({ tokens }) => {
      const openauth = authenticator.get('openauth') as OpenAuthStrategy<User.info>
      const verified = await openauth.verifyToken(User.subjects, tokens.access, {
        refresh: tokens.refresh,
      })
      return verified.subject.properties
    },
  ),
  'openauth',
)

export async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  return session.get('user')
}

export async function requireUser(request: Request) {
  let sessionUser = await getUserSession(request)
  sessionUser ??= await authenticator.authenticate('openauth', request)
  const user = await User.fromEmailWithRole(sessionUser.email)
  if (!user) {
    throw redirect('/auth/logout')
  }
  return user
}
