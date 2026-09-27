import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { Search } from 'lucide-react'

import { ArticleCard } from '@/components/ArticleCard'
import { getAllPosts, getCategories, searchPosts } from '@/lib/content'
import { seo } from '@/lib/seo'

const articleSearchSchema = z.object({
  q: z.string().catch(''),
  category: z.string().catch('all'),
})

export const Route = createFileRoute('/articles/')({
  validateSearch: articleSearchSchema,
  head: () => ({
    meta: seo({
      title: 'All Articles',
      description:
        'Every Lazy Girl Guide article in one place — books, home, travel, tech, gifts, and self-care recommendations, searchable and filterable by topic.',
    }),
  }),
  component: ArticlesPage,
})

function ArticlesPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [query, setQuery] = useState(search.q)

  const categories = ['all', ...getCategories()]
  const allPosts = getAllPosts()

  const byCategory =
    search.category === 'all' ? allPosts : allPosts.filter((p) => p.category === search.category)
  const results = searchPosts(byCategory, search.q)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-dark">
          The archive
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Every guide, all in one place
        </h1>
        <p className="mt-3 text-ink-soft">
          Search by keyword or narrow it down by topic. New guides get added here as we finish
          researching them.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            navigate({ search: (prev) => ({ ...prev, q: query }) })
          }}
          className="relative w-full sm:max-w-sm"
        >
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => {
              const value = e.target.value
              setQuery(value)
              navigate({ search: (prev) => ({ ...prev, q: value }) })
            }}
            placeholder="Search articles..."
            className="w-full rounded-full border border-line bg-paper py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
          />
        </form>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = search.category === category
            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  navigate({ search: (prev) => ({ ...prev, category }) })
                }
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'border-clay bg-clay text-cream'
                    : 'border-line bg-paper text-ink-soft hover:border-clay hover:text-clay-dark'
                }`}
              >
                {category === 'all' ? 'All topics' : category}
              </button>
            )
          })}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <ArticleCard key={post._meta.path} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink">Nothing matches yet</p>
          <p className="max-w-sm text-sm text-ink-soft">
            Try a different search term, or{' '}
            <Link
              to="/articles"
              search={{ q: '', category: 'all' }}
              className="font-semibold text-clay-dark hover:underline"
            >
              clear your filters
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
