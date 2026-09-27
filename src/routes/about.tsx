import { createFileRoute, Link } from '@tanstack/react-router'

import { cdnImage } from '@/lib/image'
import { seo } from '@/lib/seo'
import { SITE_NAME } from '@/lib/site'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: seo({
      title: 'About',
      description:
        'Lazy Girl Guide researches books, products, and experiences so you do not have to spend hours comparing options yourself.',
    }),
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-dark">About</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        We do the research so you don&apos;t have to.
      </h1>

      <div className="mt-8 overflow-hidden rounded-2xl bg-cream-dark">
        <img
          src={cdnImage('/img/brand/default-share.jpg', { w: 1200, h: 700, fit: 'cover' })}
          alt="A notebook, tea, and reading glasses arranged on a linen surface"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="prose-article mt-10">
        <p>
          {SITE_NAME} started from a fairly small complaint: buying anything, or reading anything,
          or planning anything has quietly become a research project. Ten open tabs to pick a
          pillow. Forty-five minutes of reviews to choose a paperback. A &quot;best of&quot; list
          that&apos;s obviously just an ad wearing a headline.
        </p>
        <p>
          So this is the alternative version. We look into a topic — a category of product, a
          type of trip, a kind of routine — and we come back with an honest, specific answer:
          here&apos;s what&apos;s actually worth it, here&apos;s who it&apos;s for, and here&apos;s
          when you should skip it entirely. No filler, no fake urgency, no pretending every option
          is a five-star miracle.
        </p>

        <h2>How we pick what to cover</h2>
        <p>
          We start with the question a friend would actually ask — &quot;is this worth buying&quot;
          or &quot;which one should I get&quot; — rather than whatever a brand wants written about
          it. Every recommendation gets a plain &quot;best for&quot; and, just as importantly, a
          &quot;skip it if,&quot; because half of good advice is telling you when something
          isn&apos;t for you.
        </p>

        <h2>How the money works</h2>
        <p>
          Some of the products we mention link out through affiliate programs, which means we may
          earn a small commission if you buy something after clicking through — at no extra cost
          to you. That relationship never decides what gets featured or how it&apos;s described;
          the editorial judgment comes first, and the link is just how the site stays running. You
          can read the specifics on our{' '}
          <Link to="/affiliate-disclosure" className="font-medium text-clay-dark underline underline-offset-2">
            affiliate disclosure page
          </Link>
          .
        </p>

        <h2>Who&apos;s behind it</h2>
        <p>
          {SITE_NAME} is a small, independent project. We&apos;re not backed by a retailer, we
          don&apos;t take payment to feature a product, and we&apos;d rather publish fewer, more
          useful guides than a constant stream of filler. If that sounds like your kind of site,
          you&apos;re in the right place.
        </p>
      </div>
    </div>
  )
}
