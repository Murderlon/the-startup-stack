import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'
import { db } from '../drizzle'
import { subscription as schema } from './sql'

export namespace Subscription {
  export const fromUserID = async (userId: string) => {
    return db.query.subscription.findFirst({
      where: eq(schema.userId, userId),
    })
  }

  export const fromID = async (id: string) => {
    return db.query.subscription.findFirst({
      where: eq(schema.id, id),
    })
  }

  export const insert = async (
    userID: string,
    sub: Stripe.Subscription,
    planId: string,
  ) => {
    await db.insert(schema).values({
      id: sub.id,
      userId: userID,
      planId,
      priceId: String(sub.items.data[0]!.price.id),
      interval: String(sub.items.data[0]!.plan.interval),
      status: sub.status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    })
  }

  export const update = async (userID: string, sub: Stripe.Subscription) => {
    await db
      .update(schema)
      .set({
        id: sub.id,
        userId: userID,
        planId: String(sub.items.data[0]!.plan.product),
        priceId: String(sub.items.data[0]!.price.id),
        interval: String(sub.items.data[0]!.plan.interval),
        status: sub.status,
        currentPeriodStart: new Date(sub.current_period_start),
        currentPeriodEnd: new Date(sub.current_period_end),
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      })
      .where(eq(schema.userId, userID))
  }

  export const remove = async (id: string) => {
    await db.delete(schema).where(eq(schema.id, id))
  }
}
