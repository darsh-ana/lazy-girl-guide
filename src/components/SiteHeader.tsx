import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { getCategories } from '@/lib/content'
import { SITE_NAME } from '@/lib/site'

const navLinks = [
  { to: '/articles', label: 'Articles' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clay text-sm text-cream transition-transform group-hover:-rotate-6">
        LG
      </span>
      {SITE_NAME}
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const categories = getCategories()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-clay-dark data-[status=active]:text-clay-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-paper px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-cream-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-line pt-4">
            <p className="px-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Browse by topic
            </p>
            <div className="mt-2 flex flex-wrap gap-2 px-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  to="/articles"
                  search={{ category, q: '' }}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line bg-cream px-3 py-1.5 text-sm text-ink-soft hover:border-clay hover:text-clay-dark"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
