import { Link } from '@tanstack/react-router'
import type { Post } from '@/lib/content'
import { formatDate } from '@/lib/content'
import { cdnImage } from '@/lib/image'

export function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_2px_rgba(43,36,29,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(43,36,29,0.08)]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-cream-dark">
        <img
          src={cdnImage(post.image, { w: 640, h: 480, fit: 'cover' })}
          alt={post.imageAlt || post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-clay-dark">
          <span>{post.category}</span>
          <span className="text-ink-soft/50">&middot;</span>
          <time className="text-ink-soft">{formatDate(post.date)}</time>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{post.summary}</p>
      </div>
    </Link>
  )
}

export function FeaturedArticleCard({ post }: { post: Post }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: post.slug }}
      className="group grid overflow-hidden rounded-3xl border border-line bg-paper shadow-[0_1px_2px_rgba(43,36,29,0.04)] transition-shadow hover:shadow-[0_12px_32px_rgba(43,36,29,0.1)] md:grid-cols-2"
    >
      <div className="aspect-[4/3] overflow-hidden bg-cream-dark md:aspect-auto">
        <img
          src={cdnImage(post.image, { w: 900, h: 700, fit: 'cover' })}
          alt={post.imageAlt || post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
        <span className="inline-flex w-fit items-center rounded-full bg-clay-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-clay-dark">
          Featured pick
        </span>
        <h2 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          {post.title}
        </h2>
        <p className="text-base leading-relaxed text-ink-soft">{post.summary}</p>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <span>{post.category}</span>
          <span className="text-ink-soft/50">&middot;</span>
          <time>{formatDate(post.date)}</time>
        </div>
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-clay-dark">
          Read the guide
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
