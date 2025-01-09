import { domain } from './dns'
import { email } from './email'
import { secret } from './secret'

export const authTable = new sst.aws.Dynamo('LambdaAuthTable', {
  fields: {
    pk: 'string',
    sk: 'string',
  },
  ttl: 'expiry',
  primaryIndex: {
    hashKey: 'pk',
    rangeKey: 'sk',
  },
})

export const auth = new sst.aws.Auth('Auth', {
  forceUpgrade: 'v2',
  authorizer: {
    handler: 'packages/functions/auth.handler',
    link: [
      email,
      authTable,
      secret.GITHUB_CLIENT_ID,
      secret.GITHUB_CLIENT_SECRET,
      secret.DATABASE_URL,
    ],
    permissions: [
      {
        actions: ['ses:SendEmail'],
        resources: ['*'],
      },
    ],
  },
  domain: {
    name: `auth.${domain}`,
    dns: sst.cloudflare.dns(),
  },
})
