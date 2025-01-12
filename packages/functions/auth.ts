import { issuer } from '@openauthjs/openauth'
import { handle } from 'hono/aws-lambda'
import { DynamoStorage } from '@openauthjs/openauth/storage/dynamo'
import { Resource } from 'sst'
import { PasswordProvider } from '@openauthjs/openauth/provider/password'
import { PasswordUI } from '@openauthjs/openauth/ui/password'
import { Email } from '@company/core/src/email/index'
import { User } from '@company/core/src/user/index'
import type { Theme } from '@openauthjs/openauth/ui/theme'

const theme: Theme = {
  title: 'My company',
  radius: 'md',
  primary: '#1e293b',
  favicon: 'https://stack.merlijn.site/favicon.ico',
}

const app = issuer({
  theme,
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
