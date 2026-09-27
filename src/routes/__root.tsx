import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import '../styles.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { seo } from '@/lib/seo'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/site'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#faf5ed' },
      ...seo({ title: SITE_NAME, description: SITE_DESCRIPTION }),
    ],
    links: [
      {
        rel: 'icon',
        href: `${import.meta.env.BASE_URL}logo.svg`,
        type: 'image/svg+xml',
      },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-cream font-body text-ink">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-clay-dark">404</p>
      <h1 className="font-display text-3xl font-semibold text-ink">
        We looked. We couldn&apos;t find it.
      </h1>
      <p className="text-ink-soft">
        The page you&apos;re after may have moved, or never existed in the first place. Either
        way, we didn&apos;t recommend it.
      </p>
    </div>
  )
}
