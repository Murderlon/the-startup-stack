import { eq } from 'drizzle-orm'
import { createSubjects } from '@openauthjs/openauth'
import { db } from '../drizzle'
import { user as schema, userImage as imageSchema } from './sql'
import { role, roleToUser } from '../role/sql'
import { Role } from '../role'
// TODO: switch to zod once @conform-to/zod can handle new zod version
import * as v from 'valibot'

export namespace User {
  export const subjects = createSubjects({
    user: v.object({
      id: v.string(),
      // TODO: make this email type (fails for valibot)
      email: v.string(),
      username: v.nullable(v.string()),
      customerId: v.nullable(v.string()),
      createdAt: v.nullable(v.date()),
      updatedAt: v.nullable(v.date()),
      roles: v.array(
        v.object({
          role: v.object({
            name: v.union(Role.roles.map((role) => v.literal(role))),
          }),
        }),
      ),
    }),
  })

  export const insert = async (email: string) => {
    return db.transaction(async (tx) => {
      const [newUser] = await tx.insert(schema).values({ email }).returning()
      const roles = await tx
        .select({ id: role.id, name: role.name })
        .from(role)
        .where(eq(role.name, 'user'))

      await tx
        .insert(roleToUser)
        .values(roles.map((role) => ({ roleId: role.id, userId: newUser!.id })))

      return { ...newUser, roles }
    })
  }

  export const update = async (
    id: string,
    partial: Partial<typeof schema.$inferInsert>,
  ) => {
    const user = await db.update(schema).set(partial).where(eq(schema.id, id)).returning()
    return user[0]
  }

  export const fromID = async (id: string) => {
    return db.query.user.findFirst({ where: eq(schema.id, id) })
  }

  export const fromCustomerID = async (customerID: string) => {
    return db.query.user.findFirst({
      where: eq(schema.customerId, customerID),
    })
  }

  export const fromUsername = async (username: string) => {
    return db.query.user.findFirst({
      where: eq(schema.username, username),
    })
  }

  export const image = async (id: string) => {
    return db.query.userImage.findFirst({ where: eq(imageSchema.userId, id) })
  }
}
