import { authorizer } from '@openauthjs/openauth'
import { handle } from 'hono/aws-lambda'
import { eq } from 'drizzle-orm'
import { DynamoStorage } from '@openauthjs/openauth/storage/dynamo'
import { Resource } from 'sst'
import { PasswordAdapter } from '@openauthjs/openauth/adapter/password'
import { PasswordUI } from '@openauthjs/openauth/ui/password'
import { Email } from '@company/core/src/email/index'
import { db, schema } from '@company/core/src/drizzle/index'
import { User } from '@company/core/src/user/index'

async function getUserWithRole(email: string) {
  return db.query.user.findFirst({
    where: eq(schema.user.email, email),
    with: {
      roles: {
        columns: {},
        with: {
          role: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  })
}

async function createUserWithRole(email: string) {
  await db.transaction(async (tx) => {
    const [newUser] = await tx.insert(schema.user).values({ email }).returning()
    const roles = await tx
      .select({ id: schema.role.id })
      .from(schema.role)
      .where(eq(schema.role.name, 'user'))

    await tx
      .insert(schema.roleToUser)
      .values(roles.map((role) => ({ roleId: role.id, userId: newUser!.id })))
  })
  return getUserWithRole(email)
}

const app = authorizer({
  storage: DynamoStorage({
    table: Resource.LambdaAuthTable.name,
  }),
  subjects: User.subjects,
  providers: {
    password: PasswordAdapter(
      PasswordUI({
        sendCode: async (email, code) => {
          await Email.sendAuth({ email, code })
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === 'password') {
      let user = await getUserWithRole(value.email)
      user ??= await createUserWithRole(value.email)
      if (!user) throw new Error('Unable to create user')

      return ctx.subject('user', user)
    }
    throw new Error('Invalid provider')
  },
})

export const handler = handle(app)
