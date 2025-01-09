import { auth } from './auth'
import { domain } from './dns'
import { email } from './email'
import { secret } from './secret'

export const www = new sst.aws.React('ReactRouter', {
  path: './packages/www',
  domain: {
    name: domain,
    dns: sst.cloudflare.dns(),
  },
  environment: {
    NODE_ENV: $dev === true ? 'development' : 'production',
    HOST_URL: $dev === true ? 'http://localhost:5173' : `https://${domain}`,
  },
  permissions: [
    {
      actions: ['ses:SendEmail'],
      resources: ['*'],
    },
  ],
  link: [
    email,
    auth,
    secret.SESSION_SECRET,
    secret.ENCRYPTION_SECRET,
    secret.DATABASE_URL,
    secret.STRIPE_PUBLIC_KEY,
    secret.STRIPE_SECRET_KEY,
    secret.GITHUB_CLIENT_ID,
    secret.GITHUB_CLIENT_SECRET,
    secret.HONEYPOT_ENCRYPTION_SEED,
  ],
})
