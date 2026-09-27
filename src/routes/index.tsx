import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { FeaturedArticleCard, ArticleCard } from '@/components/ArticleCard'
import { getFeaturedPost, getLatestPosts, getCategories } from '@/lib/content'
import { seo } from '@/lib/seo'
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from '@/lib/site'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: seo({ title: SITE_NAME, description: SITE_DESCRIPTION }),
  }),
  component: Home,
})

function Home() {
  const featured = getFeaturedPost()
  const latest = getLatestPosts(featured.slug, 6)
  const categories = getCategories()

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-dark">
            Actually useful recommendations
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {SITE_TAGLINE}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Books, gadgets, gifts, travel gear, whatever&apos;s worth knowing about — we dig
            through the options and tell you plainly what to buy and what to skip. No fake
            urgency, no 47-item roundups.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark"
            >
              Browse the guide
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-clay hover:text-clay-dark"
            >
              What is this, exactly?
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <FeaturedArticleCard post={featured} />
      </section>

      <section className="border-y border-line bg-paper/60">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Browse by topic
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <Link
                key={category}
                to="/articles"
                search={{ category, q: '' }}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-clay hover:text-clay-dark"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink">Latest guides</h2>
          <Link
            to="/articles"
            className="whitespace-nowrap text-sm font-semibold text-clay-dark hover:underline"
          >
            View all articles &rarr;
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post) => (
            <ArticleCard key={post._meta.path} post={post} />
          ))}
        </div>
      </section>

      <section className="bg-cream-dark/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.2fr] md:gap-14 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            What&apos;s the whole idea here?
          </h2>
          <div className="space-y-4 text-ink-soft">
            <p>
              {SITE_NAME} exists because most recommendation sites are secretly just ads with
              extra steps. We&apos;d rather spend the time comparing options so you don&apos;t
              have to open eleven tabs and read forty reviews just to buy a pillow.
            </p>
            <p>
              We cover whatever seems genuinely useful — books, home stuff, travel gear, tech,
              gifts, skincare, all of it — and we say plainly when something isn&apos;t worth it,
              which is more than most &quot;best of&quot; lists are willing to do.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-clay-dark hover:underline"
            >
              Read the full story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
