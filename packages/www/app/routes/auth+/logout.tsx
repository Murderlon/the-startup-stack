import { removeTokens } from '#app/modules/auth/auth.server.ts'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/router'

export const ROUTE_PATH = '/auth/logout' as const

export async function loader({ request }: LoaderFunctionArgs) {
  return redirect('/', { headers: await removeTokens() })
}

export async function action({ request }: ActionFunctionArgs) {
  return redirect('/', { headers: await removeTokens() })
}
