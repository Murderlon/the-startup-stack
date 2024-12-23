import type { ActionFunctionArgs } from 'react-router'
import { requireUser } from '#app/modules/auth/auth.server'
import { db, schema } from '@company/core/src/drizzle/index'
import { eq } from 'drizzle-orm'

export const ROUTE_PATH = '/resources/reset-image' as const

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request)
  await db.delete(schema.userImage).where(eq(schema.userImage.userId, user.id))
  return null
}
