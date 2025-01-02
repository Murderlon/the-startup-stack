import type { Theme, ThemeExtended } from '#app/utils/hooks/use-theme'
import { useSubmit } from 'react-router'
import { LucideSun, LucideMoon, LucideMonitor } from 'lucide-react'
import { useOptimisticThemeMode } from '#app/utils/hooks/use-theme'
import { cn } from '#app/utils/misc'
import { ROUTE_PATH as THEME_PATH } from '#app/routes/resources+/update-theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '#app/components/ui/select'

export function ThemeSwitcher({
  userPreference,
  triggerClass,
}: {
  userPreference?: Theme | null
  triggerClass?: string
}) {
  const submit = useSubmit()
  const optimisticMode = useOptimisticThemeMode()
  const mode = optimisticMode ?? userPreference ?? 'system'
  const themes: ThemeExtended[] = ['light', 'dark', 'system']

  return (
    <Select
      onValueChange={(theme) =>
        submit(
          { theme },
          {
            method: 'POST',
            action: THEME_PATH,
            navigate: false,
            fetcherKey: 'theme-fetcher',
          },
        )
      }
    >
      <SelectTrigger
        className={cn(
          'h-6 rounded border-primary/20 bg-secondary !px-2 hover:border-primary/40',
          triggerClass,
        )}
      >
        <div className="flex items-start gap-2">
          {mode === 'light' ? (
            <LucideSun className="h-[14px] w-[14px]" />
          ) : mode === 'dark' ? (
            <LucideMoon className="h-[14px] w-[14px]" />
          ) : (
            <LucideMonitor className="h-[14px] w-[14px]" />
          )}
          <span className="text-xs font-medium">
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem
            key={theme}
            value={theme}
            className={`text-sm font-medium text-primary/60 ${mode === theme && 'text-primary'}`}
          >
            {theme && theme.charAt(0).toUpperCase() + theme.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
