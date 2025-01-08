/**
 * Permissions and Roles.
 * Implementation based on github.com/epicweb-dev/epic-stack
 */
import { data } from '@remix-run/node'
import { requireUser } from '#app/modules/auth/auth.server'
import { userHasRole } from '#app/utils/misc'
import type { role } from '@company/core/src/role/sql'

export type RoleName = (typeof role.$inferInsert)['name']

export async function requireUserWithRole(request: Request, name: RoleName) {
  const user = await requireUser(request)
  const hasRole = userHasRole(user, name)
  if (!hasRole) {
    throw data(
      {
        error: 'Unauthorized',
        requiredRole: name,
        message: `Unauthorized: required role: ${name}`,
      },
      { status: 403 },
    )
  }
  return user
}
