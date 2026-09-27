import { Link } from '@tanstack/react-router'
import { Info } from 'lucide-react'

export function AffiliateNote() {
  return (
    <div className="not-prose flex items-start gap-3 rounded-xl border border-line bg-cream-dark/50 px-4 py-3.5 text-sm text-ink-soft">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-clay-dark" aria-hidden="true" />
      <p>
        This article is independent editorial content. It may contain affiliate links, and we may
        earn a commission if you buy through one — at no extra cost to you. That never changes
        which products we choose to feature.{' '}
        <Link to="/affiliate-disclosure" className="font-medium text-clay-dark underline underline-offset-2">
          Read our full disclosure
        </Link>
        .
      </p>
    </div>
  )
}
