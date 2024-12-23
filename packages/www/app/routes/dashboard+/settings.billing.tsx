import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from 'react-router'
import type { Interval, Plan as PlanEnum } from '@company/core/src/constants'
import { useState } from 'react'
import { Form, useLoaderData } from 'react-router'
import { redirect } from 'react-router'
import { requireSessionUser } from '#app/modules/auth/auth.server'
import { PLANS, PRICING_PLANS, INTERVALS, CURRENCIES } from '@company/core/src/constants'
import { getLocaleCurrency } from '#app/utils/misc.server'
import { INTENTS } from '#app/utils/constants/misc'
import { ROUTE_PATH as LOGIN_PATH } from '#app/routes/auth+/login'
import { Switch } from '#app/components/ui/switch'
import { Button } from '#app/components/ui/button'
import { Subscription } from '@company/core/src/subscription/index'
import { Stripe } from '@company/core/src/stripe'
import { ERRORS } from '#app/utils/constants/errors'
import { Plan } from '@company/core/src/plan/index'

export const ROUTE_PATH = '/dashboard/settings/billing' as const

export const meta: MetaFunction = () => {
  return [{ title: 'The Startup Stack - Billing' }]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionUser = await requireSessionUser(request, {
    redirectTo: LOGIN_PATH,
  })

  const subscription = await Subscription.fromUserID(sessionUser.id)
  const currency = getLocaleCurrency(request)

  return { subscription, currency }
}

export async function action({ request }: ActionFunctionArgs) {
  const sessionUser = await requireSessionUser(request, {
    redirectTo: LOGIN_PATH,
  })

  const formData = await request.formData()
  const intent = formData.get(INTENTS.INTENT)

  if (intent === INTENTS.SUBSCRIPTION_CREATE_CHECKOUT) {
    const planId = String(formData.get('planId'))
    const planInterval = String(formData.get('planInterval'))
    const subscription = await Subscription.fromUserID(sessionUser.id)
    if (subscription?.planId !== PLANS.FREE) return

    const currency = getLocaleCurrency(request)
    const plan = await Plan.fromID(planId)

    const price = plan?.prices.find(
      (price) => price.interval === planInterval && price.currency === currency,
    )
    if (!price) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG)
    if (!sessionUser.customerId) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG)

    const checkout = await Stripe.checkout(sessionUser.customerId, price.id)
    if (!checkout?.url) return { success: false }
    return redirect(checkout.url)
  }
  if (intent === INTENTS.SUBSCRIPTION_CREATE_CUSTOMER_PORTAL) {
    if (!sessionUser.customerId) throw new Error(ERRORS.STRIPE_SOMETHING_WENT_WRONG)
    const customerPortal = await Stripe.customerPortal(sessionUser.customerId)
    if (!customerPortal) return { success: false }
    return redirect(customerPortal.url)
  }

  return {}
}

export default function DashboardBilling() {
  const { subscription, currency } = useLoaderData<typeof loader>()

  const [selectedPlanId, setSelectedPlanId] = useState<PlanEnum>(
    (subscription?.planId as PlanEnum) ?? PLANS.FREE,
  )
  const [selectedPlanInterval, setSelectedPlanInterval] = useState<Interval>(
    INTERVALS.MONTH,
  )

  return (
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex w-full flex-col gap-2 p-6 py-2">
        <h2 className="text-xl font-medium text-primary">This is a demo app.</h2>
        <p className="text-sm font-normal text-primary/60">
          Remix SaaS is a demo app that uses Stripe test environment. You can find a list
          of test card numbers on the{' '}
          <a
            href="https://stripe.com/docs/testing#cards"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary/80 underline"
          >
            Stripe docs
          </a>
          .
        </p>
      </div>

      {/* Plans */}
      <div className="flex w-full flex-col items-start rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-2 p-6">
          <h2 className="text-xl font-medium text-primary">Plan</h2>
          <p className="flex items-start gap-1 text-sm font-normal text-primary/60">
            You are currently on the{' '}
            <span className="flex h-[18px] items-center rounded-md bg-primary/10 px-1.5 text-sm font-medium text-primary/80">
              {subscription
                ? subscription.planId?.charAt(0).toUpperCase() +
                  subscription.planId.slice(1)
                : 'Free'}
            </span>
            plan.
          </p>
        </div>

        {subscription?.planId === PLANS.FREE && (
          <div className="flex w-full flex-col items-center justify-evenly gap-2 border-border p-6 pt-0">
            {Object.values(PRICING_PLANS).map((plan) => (
              <button
                type="button"
                key={plan.id}
                tabIndex={0}
                className={`flex w-full select-none items-center rounded-md border border-border hover:border-primary/60 ${
                  selectedPlanId === plan.id && 'border-primary/60'
                }`}
                onClick={() => setSelectedPlanId(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedPlanId(plan.id)
                }}
              >
                <div className="flex w-full flex-col items-start p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-primary">
                      {plan.name}
                    </span>
                    {plan.id !== PLANS.FREE && (
                      <span className="flex items-center rounded-md bg-primary/10 px-1.5 text-sm font-medium text-primary/80">
                        {currency === CURRENCIES.USD ? '$' : '€'}{' '}
                        {selectedPlanInterval === INTERVALS.MONTH
                          ? plan.prices[INTERVALS.MONTH][currency] / 100
                          : plan.prices[INTERVALS.YEAR][currency] / 100}{' '}
                        / {selectedPlanInterval === INTERVALS.MONTH ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                  <p className="text-start text-sm font-normal text-primary/60">
                    {plan.description}
                  </p>
                </div>

                {/* Billing Switch */}
                {plan.id !== PLANS.FREE && (
                  <div className="flex items-center gap-2 px-4">
                    <label
                      htmlFor="interval-switch"
                      className="text-start text-sm text-primary/60"
                    >
                      {selectedPlanInterval === INTERVALS.MONTH ? 'Monthly' : 'Yearly'}
                    </label>
                    <Switch
                      id="interval-switch"
                      checked={selectedPlanInterval === INTERVALS.YEAR}
                      onCheckedChange={() =>
                        setSelectedPlanInterval((prev) =>
                          prev === INTERVALS.MONTH ? INTERVALS.YEAR : INTERVALS.MONTH,
                        )
                      }
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {subscription && subscription.planId !== PLANS.FREE && (
          <div className="flex w-full flex-col items-center justify-evenly gap-2 border-border p-6 pt-0">
            <div className="flex w-full items-center overflow-hidden rounded-md border border-primary/60">
              <div className="flex w-full flex-col items-start p-4">
                <div className="flex items-end gap-2">
                  <span className="text-base font-medium text-primary">
                    {subscription.planId.charAt(0).toUpperCase() +
                      subscription.planId.slice(1)}
                  </span>
                  <p className="flex items-start gap-1 text-sm font-normal text-primary/60">
                    {subscription.cancelAtPeriodEnd === true ? (
                      <span className="flex h-[18px] items-center text-sm font-medium text-red-500">
                        Expires
                      </span>
                    ) : (
                      <span className="flex h-[18px] items-center text-sm font-medium text-green-500">
                        Renews
                      </span>
                    )}
                    on:{' '}
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString('en-US')}.
                  </p>
                </div>
                <p className="text-start text-sm font-normal text-primary/60">
                  {PRICING_PLANS[PLANS.PRO].description}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-secondary px-6 py-3 dark:bg-card">
          <p className="text-sm font-normal text-primary/60">
            You will not be charged for testing the subscription upgrade.
          </p>
          {subscription?.planId === PLANS.FREE && (
            <Form method="POST">
              <input type="hidden" name="planId" value={selectedPlanId} />
              <input type="hidden" name="planInterval" value={selectedPlanInterval} />
              <Button
                type="submit"
                size="sm"
                name={INTENTS.INTENT}
                value={INTENTS.SUBSCRIPTION_CREATE_CHECKOUT}
                disabled={selectedPlanId === PLANS.FREE}
              >
                Upgrade to PRO
              </Button>
            </Form>
          )}
        </div>
      </div>

      {/* Manage Subscription */}
      <div className="flex w-full flex-col items-start rounded-lg border border-border bg-card">
        <div className="flex flex-col gap-2 p-6">
          <h2 className="text-xl font-medium text-primary">Manage Subscription</h2>
          <p className="flex items-start gap-1 text-sm font-normal text-primary/60">
            Update your payment method, billing address, and more.
          </p>
        </div>

        <div className="flex min-h-14 w-full items-center justify-between rounded-lg rounded-t-none border-t border-border bg-secondary px-6 py-3 dark:bg-card">
          <p className="text-sm font-normal text-primary/60">
            You will be redirected to the Stripe Customer Portal.
          </p>
          <Form method="POST">
            <Button
              type="submit"
              size="sm"
              name={INTENTS.INTENT}
              value={INTENTS.SUBSCRIPTION_CREATE_CUSTOMER_PORTAL}
            >
              Manage
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
