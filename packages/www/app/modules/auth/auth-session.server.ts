import { createCookieSessionStorage } from 'react-router';
import { Resource } from 'sst'

export const AUTH_SESSION_KEY = '_auth'
export const authSessionStorage = createCookieSessionStorage({
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
