import { Link } from '@tanstack/react-router'
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL } from '@/lib/site'
import { Logo } from './SiteHeader'

const columns = [
  {
    title: 'Guide',
    links: [
      { to: '/articles', label: 'All articles' },
      { to: '/about', label: 'About us' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { to: '/privacy-policy', label: 'Privacy policy' },
      { to: '/affiliate-disclosure', label: 'Affiliate disclosure' },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-cream-dark/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">{SITE_TAGLINE}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-ink hover:text-clay-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE_NAME}. We do the research so you don&apos;t have to.
          </p>
          <p>
            Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-clay-dark">{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
