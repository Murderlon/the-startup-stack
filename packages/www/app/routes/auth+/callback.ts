import { callbackURL, openauth, setTokens } from '#app/modules/auth/auth.server.ts'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { data, redirect } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const exchanged = await openauth.exchange(code!, callbackURL)
  console.log('>>> callback', exchanged)
  if (exchanged.err) {
    return data(exchanged.err, { status: 400 })
  }
  const headers = await setTokens(exchanged.tokens.access, exchanged.tokens.refresh)
  return redirect(`${url.origin}/dashboard`, { headers })
}
