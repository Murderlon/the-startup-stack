import { eq } from 'drizzle-orm'
import type { Currency, Interval } from '#core/constants.ts'
import { db } from '../drizzle'
import { plan as schema } from './sql.ts'

export namespace Plan {
  export const fromID = async (id: string) => {
    return db.query.plan.findFirst({
      where: eq(schema.id, id),
      with: { prices: true },
    })
  }

  export const price = async (planID: string, interval: Interval, currency: Currency) => {
    const plan = await fromID(planID)
    return plan?.prices.find(
      (price) => price.interval === interval && price.currency === currency,
    )
  }
}
