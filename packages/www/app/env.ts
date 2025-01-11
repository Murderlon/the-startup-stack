import type { AppLoadContext } from 'react-router'

declare module 'react-router' {
  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {} // necessary for TS to treat this as a module
