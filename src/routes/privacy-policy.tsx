import { createFileRoute, Link } from '@tanstack/react-router'

import { seo } from '@/lib/seo'
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: seo({
      title: 'Privacy Policy',
      description: `How ${SITE_NAME} collects, uses, and protects information from site visitors.`,
    }),
  }),
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-clay-dark">Legal</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated: September 2026</p>

      <div className="prose-article mt-8">
        <p>
          This policy explains what information {SITE_NAME} collects when you visit the site, how
          it&apos;s used, and the choices you have. We&apos;ve tried to write it in plain language
          rather than legal boilerplate.
        </p>

        <h2>Information we collect</h2>
        <p>
          <strong>Information you provide directly.</strong> If you use our{' '}
          <Link to="/contact" className="font-medium text-clay-dark underline underline-offset-2">
            contact form
          </Link>
          , we collect your name, email address, and whatever you write in the message field, so
          we can respond to you.
        </p>
        <p>
          <strong>Information collected automatically.</strong> Like most websites, our hosting
          and analytics tools may automatically log standard technical information — things like
          your approximate location, browser type, device type, and which pages you visit — to
          help us understand how the site is used and to keep it running reliably.
        </p>
        <p>
          <strong>Cookies.</strong> We may use basic cookies or similar local storage for things
          like remembering your preferences or measuring aggregate site traffic. We don&apos;t use
          cookies to build detailed personal profiles for advertising.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To respond to messages sent through our contact form</li>
          <li>To understand which articles and topics are useful, so we can write more of them</li>
          <li>To maintain the security and performance of the site</li>
        </ul>
        <p>We do not sell personal information.</p>

        <h2>Affiliate links</h2>
        <p>
          Some articles contain affiliate links. Clicking one may take you to a third-party
          retailer, whose own privacy policy and cookie practices apply once you&apos;re on their
          site. See our{' '}
          <Link
            to="/affiliate-disclosure"
            className="font-medium text-clay-dark underline underline-offset-2"
          >
            affiliate disclosure
          </Link>{' '}
          for more on how that works.
        </p>

        <h2>Third-party services</h2>
        <p>
          We rely on infrastructure and analytics providers to host the site and understand
          traffic patterns. These providers may process technical data (such as IP address or
          device information) on our behalf, under their own security and privacy commitments.
        </p>

        <h2>Your choices</h2>
        <p>
          You can use your browser settings to block or delete cookies at any time. If you&apos;d
          like us to delete information you&apos;ve submitted through our contact form, email us
          and we&apos;ll take care of it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes in a meaningful way, we&apos;ll update the date at the top of
          this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-clay-dark underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
