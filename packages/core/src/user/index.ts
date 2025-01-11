import { eq } from 'drizzle-orm'
import { createSubjects } from '@openauthjs/openauth/subject'
import { db } from '../drizzle'
import { user as schema, userImage as imageSchema } from './sql'
import { role, roleToUser } from '../role/sql'
import { Role } from '../role'
// TODO: switch to zod once @conform-to/zod can handle new zod version
import * as v from 'valibot'
import type { InferOutput } from 'valibot'

export namespace User {
  export const info = v.object({
    id: v.string(),
    email: v.pipe(v.string(), v.email()),
    username: v.nullable(v.string()),
    customerId: v.nullable(v.string()),
    roles: v.array(
      v.object({
        name: v.union(Role.roles.map((role) => v.literal(role))),
        id: v.string(),
      }),
    ),
  })

  export type info = InferOutput<typeof info>

  export const subjects = createSubjects({ user: info })

  export const insert = async (email: string) => {
    return db.transaction(async (tx) => {
      const result = await tx.insert(schema).values({ email }).returning()
      const user = result[0]!
      const roles = await tx
        .select({ id: role.id, name: role.name })
        .from(role)
        .where(eq(role.name, 'user'))

      await tx
        .insert(roleToUser)
        .values(roles.map((role) => ({ roleId: role.id, userId: user.id })))

      return { ...user, roles }
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

  export const fromEmailWithRole = async (email: string) => {
    const user = await db.query.user.findFirst({
      where: eq(schema.email, email),
      columns: { createdAt: false, updatedAt: false },
      with: {
        roles: {
          columns: {},
          with: {
            role: {
              columns: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    })
    if (!user) return
    return {
      ...user,
      roles: user.roles.map(({ role }) => ({ id: role.id, name: role.name })),
    }
  }

  export const imageID = async (id: string) => {
    return db.query.userImage.findFirst({
      where: eq(imageSchema.userId, id),
      columns: { id: true },
    })
  }
}
