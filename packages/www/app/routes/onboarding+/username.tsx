import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router'
import { useRef, useEffect } from 'react'
import { Form, useActionData } from 'react-router'
import { data, redirect } from 'react-router'
import { useHydrated } from 'remix-utils/use-hydrated'
import { AuthenticityTokenInput } from 'remix-utils/csrf/react'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { LucideLoader2 } from 'lucide-react'
import { requireSessionUser } from '#app/modules/auth/auth.server'
import { validateCSRF } from '#app/utils/csrf.server'
import { checkHoneypot } from '#app/utils/honeypot.server'
import { useIsPending } from '#app/utils/misc'
import { ERRORS } from '#app/utils/constants/errors'
import { ROUTE_PATH as LOGIN_PATH } from '#app/routes/auth+/login'
import { Input } from '#app/components/ui/input'
import { Button } from '#app/components/ui/button'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { User } from '@company/core/src/user/index'
import { Stripe } from '@company/core/src/stripe'
import { Subscription } from '@company/core/src/subscription/index'
import { getLocaleCurrency } from '#app/utils/misc.server'
import { INTERVALS, PLANS } from '@company/core/src/constants'
import { Plan } from '@company/core/src/plan/index'

export const ROUTE_PATH = '/onboarding/username' as const

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .toLowerCase()
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, 'Username may only contain alphanumeric characters.'),
})

export const meta: MetaFunction = () => {
  return [{ title: 'The Startup Stack - Username' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireSessionUser(request, { redirectTo: LOGIN_PATH })
  return {}
}

export async function action({ request }: ActionFunctionArgs) {
  const sessionUser = await requireSessionUser(request, {
    redirectTo: LOGIN_PATH,
  })

  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()
  await validateCSRF(formData, clonedRequest.headers)
  checkHoneypot(formData)

  const submission = parseWithZod(formData, { schema: UsernameSchema })
  if (submission.status !== 'success') {
    return data(submission.reply(), { status: submission.status === 'error' ? 400 : 200 })
  }

  const { username } = submission.value
  const usernameExists = Boolean(await User.fromUsername(username))

  if (usernameExists) {
    return data(
      submission.reply({
        fieldErrors: {
          username: [ERRORS.ONBOARDING_USERNAME_ALREADY_EXISTS],
        },
      }),
    )
  }
  const user = await User.update(sessionUser.id, { username })
  const customer = await Stripe.createCustomer(user.email, user.username ?? undefined)
  const price = await Plan.price(PLANS.FREE, INTERVALS.YEAR, getLocaleCurrency(request))

  if (!price) throw new Error('Could not find price for free plan.')

  const subscription = await Stripe.createSubscription(customer.id, price.id)
  await User.update(user.id, { customerId: customer.id })
  await Subscription.insert(user.id, subscription)

  return redirect(DASHBOARD_PATH)
}

export default function OnboardingUsername() {
  const lastResult = useActionData<typeof action>()
  const inputRef = useRef<HTMLInputElement>(null)
  const isHydrated = useHydrated()
  const isPending = useIsPending()

  const [form, { username }] = useForm({
    lastResult,
    constraint: getZodConstraint(UsernameSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UsernameSchema })
    },
  })

  useEffect(() => {
    isHydrated && inputRef.current?.focus()
  }, [isHydrated])

  return (
    <div className="mx-auto flex h-full w-full max-w-96 flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <span className="mb-2 select-none text-6xl">👋</span>
        <h3 className="text-center text-2xl font-medium text-primary">Welcome!</h3>
        <p className="text-center text-base font-normal text-primary/60">
          Let's get started by choosing a username.
        </p>
      </div>

      <Form
        method="POST"
        autoComplete="off"
        className="flex w-full flex-col items-start gap-1"
        {...getFormProps(form)}
      >
        {/* Security */}
        <AuthenticityTokenInput />
        <HoneypotInputs />

        <div className="flex w-full flex-col gap-1.5">
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <Input
            placeholder="Username"
            autoComplete="off"
            ref={inputRef}
            required
            className={`bg-transparent ${
              username.errors && 'border-destructive focus-visible:ring-destructive'
            }`}
            {...getInputProps(username, { type: 'text' })}
          />
        </div>

        <div className="flex flex-col">
          {username.errors && (
            <span className="mb-2 text-sm text-destructive dark:text-destructive-foreground">
              {username.errors.join(' ')}
            </span>
          )}
        </div>

        <Button type="submit" size="sm" className="w-full">
          {isPending ? <LucideLoader2 className="animate-spin" /> : 'Continue'}
        </Button>
      </Form>

      <p className="px-6 text-center text-sm font-normal leading-normal text-primary/60">
        You can update your username at any time from your account settings.
      </p>
    </div>
  )
}
