import { issuer } from '@openauthjs/openauth'
import { handle } from 'hono/aws-lambda'
import { DynamoStorage } from '@openauthjs/openauth/storage/dynamo'
import { Resource } from 'sst'
import { PasswordProvider } from '@openauthjs/openauth/provider/password'
import { PasswordUI } from '@openauthjs/openauth/ui/password'
import { Email } from '@company/core/src/email/index'
import { User } from '@company/core/src/user/index'

const app = issuer({
  storage: DynamoStorage({
    table: Resource.LambdaAuthTable.name,
  }),
  subjects: User.subjects,
  providers: {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          await Email.sendAuth({ email, code })
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === 'password') {
      let user = await User.fromEmailWithRole(value.email)
      user ??= await User.insert(value.email)
      if (!user) throw new Error('Unable to create user')

      return ctx.subject('user', user)
    }
    throw new Error('Invalid provider')
  },
})

export const handler = handle(app)
