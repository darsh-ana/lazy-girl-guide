// Central place that decides how a product recommendation links out to a retailer.
// Editors paste a ready-to-use URL from whichever affiliate program (or none yet)
// into a product's `url` field in its article frontmatter — nothing else in the
// app needs to change when a new affiliate program is added.
export interface LinkableProduct {
  url?: string
}

export function getOutboundLink(product: LinkableProduct): string | null {
  const url = product.url?.trim()
  return url ? url : null
}
