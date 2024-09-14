import { redirect } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { TOTPStrategy } from 'remix-auth-totp'
import { GitHubStrategy } from 'remix-auth-github'
import { authSessionStorage } from '#app/modules/auth/auth-session.server'
import { sendAuthEmail } from '#app/modules/email/templates/auth-email'
import { HOST_URL } from '#app/utils/misc.server'
import { ERRORS } from '#app/utils/constants/errors'
import { ROUTE_PATH as LOGOUT_PATH } from '#app/routes/auth+/logout'
import { ROUTE_PATH as MAGIC_LINK_PATH } from '#app/routes/auth+/magic-link'
import { db, schema } from '#db/index.js'
import { eq } from 'drizzle-orm'
import { type User } from '#db/schema.js'

function getUserWithImageAndRole(email: string) {
  return db.query.user.findFirst({
    where: eq(schema.user.email, email),
    with: {
      image: { columns: { id: true } },
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

function createUseWithImageAndRole(email: string) {
  console.log('createUseWithImageAndRole', email)
  return db.transaction(async (tx) => {
    const [newUser] = await tx.insert(schema.user).values({ email }).returning()
    const roles = await tx
      .select({ id: schema.role.id })
      .from(schema.role)
      .where(eq(schema.role.name, 'user'))

    await tx
      .insert(schema.roleToUser)
      .values(roles.map((role) => ({ roleId: role.id, userId: newUser.id })))

    return getUserWithImageAndRole(email)
  })
}

export const authenticator = new Authenticator<User>(authSessionStorage)

/**
 * TOTP - Strategy.
 */
authenticator.use(
  new TOTPStrategy(
    {
      secret: process.env.ENCRYPTION_SECRET || 'NOT_A_STRONG_SECRET',
      magicLinkPath: MAGIC_LINK_PATH,
      sendTOTP: async ({ email, code, magicLink }) => {
        if (process.env.NODE_ENV === 'development') {
          // Development Only: Log the TOTP code.
          console.log('=============================')
          console.log('[ Dev-Only ] TOTP Code:', code)
          console.log('=============================')

          // Email is not sent for admin users.
          if (email.startsWith('admin')) {
            console.log('Not sending email for admin user.')
            return
          }
        }
        await sendAuthEmail({ email, code, magicLink })
      },
    },
    async ({ email }) => {
      let user = await getUserWithImageAndRole(email)

      if (!user) {
        user = await createUseWithImageAndRole(email)
        if (!user) throw new Error(ERRORS.AUTH_USER_NOT_CREATED)
      }

      return user
    },
  ),
)

/**
 * Github - Strategy.
 */
authenticator.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      callbackURL: `${HOST_URL}/auth/github/callback`,
    },
    async ({ profile }) => {
      const email = profile._json.email || profile.emails[0].value

      let user = await getUserWithImageAndRole(email)

      if (!user) {
        user = await createUseWithImageAndRole(email)
        if (!user) throw new Error(ERRORS.AUTH_USER_NOT_CREATED)
      }

      return user
    },
  ),
)

/**
 * Utilities.
 */
export async function requireSessionUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const sessionUser = await authenticator.isAuthenticated(request)
  if (!sessionUser) {
    if (!redirectTo) throw redirect(LOGOUT_PATH)
    else throw redirect(redirectTo)
  }
  return sessionUser
}

export async function requireUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const sessionUser = await authenticator.isAuthenticated(request)
  const user = sessionUser?.email
    ? await getUserWithImageAndRole(sessionUser!.email)
    : null
  if (!user) {
    if (!redirectTo) throw redirect(LOGOUT_PATH)
    else throw redirect(redirectTo)
  }
  return user
}
