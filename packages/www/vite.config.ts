import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    target: 'ES2022',
  },
  plugins: [reactRouter(), tsconfigPaths()],
})
