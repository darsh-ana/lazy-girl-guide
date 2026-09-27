import { createFileRoute, notFound } from '@tanstack/react-router'

import { ArticleBody } from '@/components/ArticleBody'
import { ArticleCard } from '@/components/ArticleCard'
import { AffiliateNote } from '@/components/AffiliateNote'
import { cdnImage } from '@/lib/image'
import { getPostBySlug, getRelatedPosts, formatDate } from '@/lib/content'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/articles/$slug')({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug)
    if (!post) {
      throw notFound()
    }
    return post
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    return {
      meta: seo({
        title: loaderData.seoTitle || loaderData.title,
        description: loaderData.seoDescription || loaderData.summary,
        image: loaderData.image,
        type: 'article',
      }),
    }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const post = Route.useLoaderData()
  const related = getRelatedPosts(post)
  const hasProducts = post.products.length > 0

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-clay-dark">
        <span>{post.category}</span>
        <span className="text-ink-soft/50">&middot;</span>
        <time className="text-ink-soft" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <span className="text-ink-soft/50">&middot;</span>
        <span className="text-ink-soft">{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.summary}</p>

      <div className="mt-8 overflow-hidden rounded-2xl bg-cream-dark">
        <img
          src={cdnImage(post.image, { w: 1200, h: 800, fit: 'cover' })}
          alt={post.imageAlt || post.title}
          className="h-full w-full object-cover"
        />
      </div>

      {hasProducts && (
        <div className="mt-8">
          <AffiliateNote />
        </div>
      )}

      <div className="mt-10">
        <ArticleBody content={post.content} products={post.products} />
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-ink">More from {post.category}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ArticleCard key={p._meta.path} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
