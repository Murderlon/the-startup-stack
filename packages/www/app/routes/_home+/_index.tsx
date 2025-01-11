import type { MetaFunction, LoaderFunctionArgs } from 'react-router'
import { Link, useLoaderData } from 'react-router'
import Markdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { getUserSession } from '#app/modules/auth/auth.server'
import { siteConfig } from '#app/utils/constants/brand'
import { buttonVariants } from '#app/components/ui/button'
import { Logo } from '#app/components/logo'
import { useTheme } from '#app/utils/hooks/use-theme.ts'

export const meta: MetaFunction = () => {
  return [{ title: `${siteConfig.siteTitle} - Starter Kit` }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserSession(request)
  const readme = await fetch(
    'https://github.com/Murderlon/the-startup-stack/raw/refs/heads/main/readme.md',
  )
  return { user, readme: await readme.text() }
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
        <div className="flex gap-4">
          <div className="relative flex items-center justify-center">
            <a
              href="https://github.com/murderlon/the-startup-stack"
              target="_blank"
              rel="noreferrer"
              className="h-10 select-none items-center gap-2 rounded-full bg-green-500/5 px-2 py-1 pr-2.5 text-base font-medium tracking-tight text-green-600 ring-1 ring-inset ring-green-600/20 backdrop-blur-sm transition-all duration-300 hover:brightness-110 dark:bg-yellow-800/40 dark:text-yellow-100 dark:ring-yellow-200/50 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600 dark:text-yellow-100"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Star on GitHub
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className={buttonVariants({ size: 'sm' })}>
              {user ? 'Dashboard' : 'Get Started'}
            </Link>
          </div>
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
