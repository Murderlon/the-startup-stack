import { destroySession, getSession } from '#app/modules/auth/auth.server.ts'
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/router'

export const ROUTE_PATH = '/auth/logout' as const

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  return redirect('/', { headers: { 'Set-Cookie': await destroySession(session) } })
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  return redirect('/', { headers: { 'Set-Cookie': await destroySession(session) } })
}
