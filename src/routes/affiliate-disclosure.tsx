import { createFileRoute, Link } from '@tanstack/react-router'

import { seo } from '@/lib/seo'
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export const Route = createFileRoute('/affiliate-disclosure')({
  head: () => ({
    meta: seo({
      title: 'Affiliate Disclosure',
      description: `How ${SITE_NAME} handles affiliate links and product recommendations.`,
    }),
  }),
  component: AffiliateDisclosurePage,
})

function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-dark">Legal</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Affiliate Disclosure
      </h1>

      <div className="prose-article mt-8">
        <p>
          In accordance with the FTC&apos;s guidelines on endorsements and testimonials, here is a
          clear explanation of how affiliate links work on {SITE_NAME}.
        </p>

        <h2>What this means</h2>
        <p>
          Some product recommendations in our articles include links to retailers or brands. If
          you click one of these links and make a purchase, we may earn a small commission. This
          comes at no extra cost to you — the price you pay is the same whether you use our link
          or go directly to the retailer.
        </p>

        <h2>What this doesn&apos;t mean</h2>
        <p>
          A product being linked does not mean it has paid to be featured, and it does not mean
          the brand endorses {SITE_NAME} or vice versa. We choose what to recommend based on our
          own research and editorial judgment, first. The affiliate link, when one exists, is
          added afterward — it never determines which products we cover or how we describe them.
        </p>
        <p>
          We do not accept payment in exchange for a positive review, and we do not fabricate
          personal experience with a product we haven&apos;t actually researched. Where we haven&apos;t
          tested something ourselves, we say so.
        </p>

        <h2>Not every link is an affiliate link</h2>
        <p>
          Some products we mention don&apos;t currently have an affiliate link attached at all —
          in those cases, we say so directly rather than linking to a random retailer just to
          have a link.
        </p>

        <h2>Why we do this at all</h2>
        <p>
          Running a research-driven site takes real time. Affiliate commissions are one of the
          ways {SITE_NAME} stays independent and ad-network-free, rather than relying on intrusive
          advertising or sponsored placements dressed up as editorial content.
        </p>

        <p>
          Questions about a specific recommendation or link? Reach out through our{' '}
          <Link to="/contact" className="font-medium text-clay-dark underline underline-offset-2">
            contact page
          </Link>{' '}
          or email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-clay-dark underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
