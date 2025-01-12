import { auth } from './auth'
import { domain } from './dns'
import { email } from './email'
import { secret } from './secret'
import { webhook } from './stripe'

export const api = new sst.aws.Function('Api', {
  url: true,
  handler: 'packages/functions/api/index.handler',
  link: [secret.DATABASE_URL, secret.STRIPE_SECRET_KEY, webhook, email, auth],
  permissions: [
    {
      actions: ['ses:SendEmail'],
      resources: ['*'],
    },
  ],
})

new sst.aws.Router('ApiRouter', {
  domain: {
    name: `api.${domain}`,
    dns: sst.cloudflare.dns(),
  },
  routes: { '/*': api.url },
})
