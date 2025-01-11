import type { LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import {
  authenticator,
  getSession,
  commitSession,
} from '#app/modules/auth/auth.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await authenticator.authenticate('openauth', request)
  const session = await getSession(request.headers.get('Cookie'))

  session.set('user', sessionUser)

  console.log('callback', sessionUser)

  return redirect(`${process.env.HOST_URL}/dashboard`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}
