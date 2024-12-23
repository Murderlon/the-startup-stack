import { Link, useLocation, useNavigate, useSubmit } from 'react-router';
import {
  LucideCheck,
  LucideChevronDown,
  LucideChevronUp,
  LucideLogOut,
  LucideSettings,
  LucideSlash,
} from 'lucide-react'
import { Logo } from '#app/components/logo'
import { LanguageSwitcher } from '#app/components/misc/language-switcher'
import { ThemeSwitcher } from '#app/components/misc/theme-switcher'
import { Button, buttonVariants } from '#app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#app/components/ui/dropdown-menu'
import type { requireUserWithRole } from '#app/utils/permissions.server'
import { PLANS } from '@company/core/src/constants'
import { ROUTE_PATH as ADMIN_PATH } from '#app/routes/admin+/_layout'
import { ROUTE_PATH as LOGOUT_PATH } from '#app/routes/auth+/logout'
import { ROUTE_PATH as DASHBOARD_PATH } from '#app/routes/dashboard+/_layout'
import { ROUTE_PATH as DASHBOARD_SETTINGS_PATH } from '#app/routes/dashboard+/settings'
import { ROUTE_PATH as DASHBOARD_SETTINGS_BILLING_PATH } from '#app/routes/dashboard+/settings.billing'
import { useRequestInfo } from '#app/utils/hooks/use-request-info'
import { cn, getUserImgSrc, userHasRole } from '#app/utils/misc'

type NavigationProps = {
  user: Awaited<ReturnType<typeof requireUserWithRole>>
  planId?: string
}

export function Navigation({ user, planId }: NavigationProps) {
  const navigate = useNavigate()
  const submit = useSubmit()
  const requestInfo = useRequestInfo()

  const location = useLocation()
  const isAdminPath = location.pathname === ADMIN_PATH
  const isDashboardPath = location.pathname === DASHBOARD_PATH
  const isSettingsPath = location.pathname === DASHBOARD_SETTINGS_PATH
  const isBillingPath = location.pathname === DASHBOARD_SETTINGS_BILLING_PATH

  return (
    <nav className="sticky top-0 z-50 flex w-full flex-col border-b border-border bg-card px-6">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between py-3">
        <div className="flex h-10 items-center gap-2">
          <Link
            to={DASHBOARD_PATH}
            prefetch="intent"
            className="flex h-10 items-center gap-1"
          >
            <Logo />
          </Link>
          <LucideSlash className="h-6 w-6 -rotate-12 stroke-[1.5px] text-primary/10" />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 px-2 data-[state=open]:bg-primary/5"
              >
                <div className="flex items-center gap-2">
                  {user?.image?.id ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      alt={user.username ?? user.email}
                      src={getUserImgSrc(user.image?.id)}
                    />
                  ) : (
                    <span className="h-8 w-8 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                  )}

                  <p className="text-sm font-medium text-primary/80">
                    {user?.username || ''}
                  </p>
                  <span className="flex h-5 items-center rounded-full bg-primary/10 px-2 text-xs font-medium text-primary/80">
                    {(planId && planId.charAt(0).toUpperCase() + planId.slice(1)) ||
                      'Free'}
                  </span>
                </div>
                <span className="flex flex-col items-center justify-center">
                  <LucideChevronUp className="relative top-[3px] h-[14px] w-[14px] stroke-[1.5px] text-primary/60" />
                  <LucideChevronDown className="relative bottom-[3px] h-[14px] w-[14px] stroke-[1.5px] text-primary/60" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="min-w-56 bg-card p-2">
              <DropdownMenuLabel className="flex items-center text-xs font-normal text-primary/60">
                Personal Account
              </DropdownMenuLabel>
              <DropdownMenuItem className="h-10 w-full cursor-pointer justify-between rounded-md bg-secondary px-2">
                <div className="flex items-center gap-2">
                  {user?.image?.id ? (
                    <img
                      className="h-6 w-6 rounded-full object-cover"
                      alt={user.username ?? user.email}
                      src={getUserImgSrc(user.image?.id)}
                    />
                  ) : (
                    <span className="h-6 w-6 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                  )}

                  <p className="text-sm font-medium text-primary/80">
                    {user?.username || ''}
                  </p>
                </div>
                <LucideCheck className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60" />
              </DropdownMenuItem>

              {planId && planId === PLANS.FREE && (
                <>
                  <DropdownMenuSeparator className="mx-0 my-2" />
                  <DropdownMenuItem className="p-0 focus:bg-transparent">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => navigate(DASHBOARD_SETTINGS_BILLING_PATH)}
                    >
                      Upgrade to PRO
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex h-10 items-center gap-3">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                {user?.image?.id ? (
                  <img
                    className="min-h-8 min-w-8 rounded-full object-cover"
                    alt={user.username ?? user.email}
                    src={getUserImgSrc(user.image?.id)}
                  />
                ) : (
                  <span className="min-h-8 min-w-8 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={8}
              className="fixed -right-4 min-w-56 bg-card p-2"
            >
              <DropdownMenuItem className="group flex-col items-start focus:bg-transparent">
                <p className="text-sm font-medium text-primary/80 group-hover:text-primary group-focus:text-primary">
                  {user?.username || ''}
                </p>
                <p className="text-sm text-primary/60">{user?.email}</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => navigate(DASHBOARD_SETTINGS_PATH)}
              >
                <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Settings
                </span>
                <LucideSettings className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  'group flex h-9 justify-between rounded-md px-2 hover:bg-transparent',
                )}
              >
                <span className="w-full text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Theme
                </span>
                <ThemeSwitcher userPreference={requestInfo.userPrefs.theme} />
              </DropdownMenuItem>

              <DropdownMenuItem
                className={cn(
                  'group flex h-9 justify-between rounded-md px-2 hover:bg-transparent',
                )}
              >
                <span className="w-full text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Language
                </span>
                <LanguageSwitcher />
              </DropdownMenuItem>

              <DropdownMenuSeparator className="mx-0 my-2" />

              <DropdownMenuItem
                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2"
                onClick={() => submit({}, { action: LOGOUT_PATH, method: 'POST' })}
              >
                <span className="text-sm text-primary/60 group-hover:text-primary group-focus:text-primary">
                  Log Out
                </span>
                <LucideLogOut className="h-[18px] w-[18px] stroke-[1.5px] text-primary/60 group-hover:text-primary group-focus:text-primary" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-xl items-center gap-3">
        {user && userHasRole(user, 'admin') && (
          <div
            className={`flex h-12 items-center border-b-2 ${isAdminPath ? 'border-primary' : 'border-transparent'}`}
          >
            <Link
              to={ADMIN_PATH}
              prefetch="intent"
              className={cn(
                `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
              )}
            >
              Admin
            </Link>
          </div>
        )}
        <div
          className={`flex h-12 items-center border-b-2 ${isDashboardPath ? 'border-primary' : 'border-transparent'}`}
        >
          <Link
            to={DASHBOARD_PATH}
            prefetch="intent"
            className={cn(
              `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
            )}
          >
            Dashboard
          </Link>
        </div>
        <div
          className={`flex h-12 items-center border-b-2 ${isSettingsPath ? 'border-primary' : 'border-transparent'}`}
        >
          <Link
            to={DASHBOARD_SETTINGS_PATH}
            prefetch="intent"
            className={cn(
              `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
            )}
          >
            Settings
          </Link>
        </div>
        <div
          className={`flex h-12 items-center border-b-2 ${isBillingPath ? 'border-primary' : 'border-transparent'}`}
        >
          <Link
            to={DASHBOARD_SETTINGS_BILLING_PATH}
            prefetch="intent"
            className={cn(
              `${buttonVariants({ variant: 'ghost', size: 'sm' })} text-primary/80`,
            )}
          >
            Billing
          </Link>
        </div>
      </div>
    </nav>
  )
}
