export function cdnImage(
  url: string,
  opts: { w?: number; h?: number; fit?: 'cover' | 'contain' | 'fill' } = {},
) {
  if (import.meta.env.MODE === 'github-pages') {
    return `${import.meta.env.BASE_URL}${url.replace(/^\//, '')}`
  }

  const params = new URLSearchParams({ url })
  if (opts.w) params.set('w', String(opts.w))
  if (opts.h) params.set('h', String(opts.h))
  if (opts.fit) params.set('fit', opts.fit)
  params.set('fm', 'webp')
  return `/.netlify/images?${params.toString()}`
}
