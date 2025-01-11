import { PLANS } from '@company/core/src/constants'
import { Email } from '@company/core/src/email/index'
import { Stripe } from '@company/core/src/stripe'
import { Subscription } from '@company/core/src/subscription/index'
import { User } from '@company/core/src/user/index'
import { Hono } from 'hono'
import { z } from 'zod'

export const route = new Hono().post('/', async (ctx) => {
  const sig = ctx.req.header('stripe-signature')

  if (!sig) throw new Error(Stripe.errors.MISSING_SIGNATURE)

  const event = await Stripe.createEvent(await ctx.req.text(), sig)

  console.log(event.type)

  try {
    switch (event.type) {
      /**
       * Occurs when a Checkout Session has been successfully completed.
       */
      case 'checkout.session.completed': {
        const session = event.data.object

        const { customer: customerId, subscription: subscriptionId } = z
          .object({ customer: z.string(), subscription: z.string() })
          .parse(session)

        const user = await User.fromCustomerID(customerId)
        if (!user) throw new Error('Something went wrong')

        const subscription = await Stripe.getSubscription(subscriptionId)
        await Subscription.update(user.id, subscription)

        await Email.sendSubscriptionSuccess({ email: user.email, subscriptionId })

        // Cancel free subscription. — User upgraded to a paid plan.
        // Not required, but it's a good practice to keep just a single active plan.
        const subscriptions = (await Stripe.listSubscriptions(customerId)).data.map(
          (sub) => sub.items,
        )

        if (subscriptions.length > 1) {
          const freeSubscription = subscriptions.find((sub) =>
            sub.data.some((item) => item.price.product === PLANS.FREE),
          )
          if (freeSubscription) {
            await Stripe.cancelSubscription(freeSubscription?.data[0]!.subscription)
          }
        }

        return ctx.json({})
      }

      /**
       * Occurs when a Stripe subscription has been updated.
       * E.g. when a user upgrades or downgrades their plan.
       */
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const { customer: customerId } = z
          .object({ customer: z.string() })
          .parse(subscription)

        const user = await User.fromCustomerID(customerId)
        if (!user)
          throw new Error('Something went wrong while trying to handle Stripe API.')

        await Subscription.update(user.id, subscription)

        return ctx.json({})
      }

      /**
       * Occurs whenever a customer’s subscription ends.
       */
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const { id } = z.object({ id: z.string() }).parse(subscription)

        const dbSubscription = await Subscription.fromID(id)
        if (dbSubscription) {
          Subscription.remove(dbSubscription.id)
        }

        return ctx.json({})
      }
    }
  } catch (err: unknown) {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        const { customer: customerId, subscription: subscriptionId } = z
          .object({ customer: z.string(), subscription: z.string() })
          .parse(session)

        const user = await User.fromCustomerID(customerId)
        if (!user) throw new Error(Stripe.errors.SOMETHING_WENT_WRONG)

        await Email.sendSubscriptionError({ email: user.email, subscriptionId })
        return ctx.json({})
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        const { id: subscriptionId, customer: customerId } = z
          .object({ id: z.string(), customer: z.string() })
          .parse(subscription)

        const user = await User.fromCustomerID(customerId)
        if (!user) {
          throw new Error(Stripe.errors.SOMETHING_WENT_WRONG)
        }

        await Email.sendSubscriptionError({ email: user.email, subscriptionId })
        return ctx.json({})
      }
    }

    throw err
  }

  return ctx.json({})
})
