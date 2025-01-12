import { Stripe } from '@company/core/src/stripe'
import { db, schema } from '../drizzle'
import { PRICING_PLANS } from '../constants'

export default async function seed() {
  const prices = await Stripe.client.prices.list()
  const products = await Stripe.client.products.list()
  const stage = JSON.parse(process.env.SST_RESOURCE_App as string).stage
  const activeProducts = products.data.filter(
    (p) => p.active && p.metadata.stage === stage,
  )

  for (const { id, name, description } of Object.values(PRICING_PLANS)) {
    const stripeProduct = activeProducts.find((p) => p.name === name)!
    await db.transaction(async (tx) => {
      await tx.insert(schema.plan).values({ id, name, description })
      await tx.insert(schema.price).values(
        prices.data
          .filter(
            (price) =>
              price.product === stripeProduct.id && price.metadata.stage === stage,
          )
          .map((price) => ({
            id: price.id,
            planId: id,
            amount: price.unit_amount ?? 0,
            currency: price.currency,
            interval: price.recurring?.interval ?? 'month',
          })),
      )
    })
  }
}
