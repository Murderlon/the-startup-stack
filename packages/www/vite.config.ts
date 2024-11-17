import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import { flatRoutes } from 'remix-flat-routes'
import { remixDevTools } from 'remix-development-tools'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    target: 'ES2022',
  },
  plugins: [
    remixDevTools(),
    remix({
      // future: {
      //   v3_fetcherPersist: true,
      //   v3_relativeSplatPath: true,
      //   v3_throwAbortReason: true,
      // },
      serverModuleFormat: 'esm',
      ignoredRouteFiles: ['**/.*'],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes)
      },
    }),
    tsconfigPaths(),
  ],
})