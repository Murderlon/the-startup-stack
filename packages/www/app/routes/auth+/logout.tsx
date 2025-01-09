import { removeTokens } from '#app/modules/auth/auth.server.ts'
import { redirect } from '@remix-run/router'

export const ROUTE_PATH = '/auth/logout' as const

export async function loader() {
  return redirect('/', { headers: { 'Set-Cookie': await removeTokens() } })
}

export async function action() {
  return redirect('/', { headers: { 'Set-Cookie': await removeTokens() } })
}
