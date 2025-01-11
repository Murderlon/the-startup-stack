import type { LoaderFunctionArgs } from 'react-router'
import { Outlet, useLoaderData } from 'react-router'
import { redirect } from 'react-router'
import { requireUser } from '#app/modules/auth/auth.server'
import { ROUTE_PATH as ONBOARDING_USERNAME_PATH } from '#app/routes/onboarding+/username'
import { Navigation } from '#app/components/navigation'
import { Subscription } from '@company/core/src/subscription/index'
import { User } from '@company/core/src/user/index'

export const ROUTE_PATH = '/dashboard' as const

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  if (!user.username) return redirect(ONBOARDING_USERNAME_PATH)
  const subscription = await Subscription.fromUserID(user.id)
  const image = await User.imageID(user.id)

  return { user, subscription, image }
}

export default function Dashboard() {
  const { user, subscription, image } = useLoaderData<typeof loader>()

  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-secondary dark:bg-black">
      <Navigation user={user} planId={subscription?.planId} image={image} />
      <Outlet />
    </div>
  )
}
