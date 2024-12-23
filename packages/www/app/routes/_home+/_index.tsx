import fs from 'node:fs/promises'
import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { authenticator } from '#app/modules/auth/auth.server'
import { siteConfig } from '#app/utils/constants/brand'
import { ROUTE_PATH as LOGIN_PATH } from '#app/routes/auth+/login'
import { buttonVariants } from '#app/components/ui/button'
import { Logo } from '#app/components/logo'
import { useTheme } from '#app/utils/hooks/use-theme.ts'

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.siteTitle} - Starter Kit` }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await authenticator.isAuthenticated(request)
  const readme = await fs.readFile(
    new URL('../../../../../readme.md', import.meta.url),
    'utf8',
  )
  return { user: sessionUser, readme }
}

export default function Index() {
  const { user, readme } = useLoaderData<typeof loader>()
  const theme = useTheme()

  return (
    <>
      {/* Navigation */}
      <div className="sticky top-0 z-50 mx-auto flex w-full max-w-screen-lg items-center justify-between p-6 py-3">
        <Link to="/" prefetch="intent" className="flex h-10 items-center gap-1">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to={LOGIN_PATH} className={buttonVariants({ size: 'sm' })}>
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
        </div>
      </div>

      {/* Background */}
      <img
        src="/images/shadow.png"
        alt="Hero"
        className={`fixed left-0 top-0 -z-10 h-full w-full opacity-60 ${theme === 'dark' ? 'invert' : ''}`}
      />
      <div className="base-grid fixed -z-20 h-screen w-screen opacity-40" />

      <Markdown
        rehypePlugins={[rehypeSlug]}
        className="prose md:prose-xl px-8 mx-auto dark:prose-invert"
      >
        {readme}
      </Markdown>
    </>
  )
}
