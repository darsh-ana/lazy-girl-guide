import { cdnImage } from '@/lib/image'
import { getOutboundLink } from '@/lib/affiliate'
import { ArrowUpRight } from 'lucide-react'

export interface ArticleProduct {
  id: string
  name: string
  image?: string
  blurb: string
  bestFor?: string
  skipIf?: string
  priceRange?: string
  url?: string
}

export function ProductCard({ product }: { product: ArticleProduct }) {
  const link = getOutboundLink(product)

  return (
    <aside className="not-prose my-8 overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="flex items-center justify-between gap-2 border-b border-line bg-clay-light/50 px-5 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-clay-dark">
          Recommendation
        </span>
        {product.priceRange && (
          <span className="text-xs font-medium text-ink-soft">{product.priceRange}</span>
        )}
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-[140px_1fr] sm:p-6">
        {product.image && (
          <div className="aspect-square w-full overflow-hidden rounded-xl bg-cream-dark sm:w-[140px]">
            <img
              src={cdnImage(product.image, { w: 280, h: 280, fit: 'cover' })}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h4 className="font-display text-lg font-semibold text-ink">{product.name}</h4>
          <p className="text-sm leading-relaxed text-ink-soft">{product.blurb}</p>

          {(product.bestFor || product.skipIf) && (
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              {product.bestFor && (
                <div className="rounded-lg bg-sage/10 px-3 py-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-sage">
                    Best for
                  </dt>
                  <dd className="mt-0.5 text-ink-soft">{product.bestFor}</dd>
                </div>
              )}
              {product.skipIf && (
                <div className="rounded-lg bg-ink/5 px-3 py-2">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    Skip it if
                  </dt>
                  <dd className="mt-0.5 text-ink-soft">{product.skipIf}</dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-1">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-clay-dark"
              >
                Check price
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-4 py-2 text-sm font-medium text-ink-soft">
                Link coming soon
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
