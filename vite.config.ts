import { env } from 'node:process'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import contentCollections from '@content-collections/vite'

const config = defineConfig(({ mode }) => {
  const isGitHubPages = mode === 'github-pages'

  return {
    base: env.VITE_BASE_PATH ?? '/',
    plugins: [
      contentCollections(),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      ...(!isGitHubPages ? [netlify()] : []),
      tanstackStart(isGitHubPages ? { prerender: { enabled: true } } : {}),
      viteReact(),
    ],
  }
})

export default config
