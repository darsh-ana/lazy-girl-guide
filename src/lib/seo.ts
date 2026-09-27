import { SITE_NAME, SITE_URL, DEFAULT_SHARE_IMAGE } from './site'

function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl
  if (!SITE_URL) {
    return import.meta.env.MODE === 'github-pages'
      ? `${import.meta.env.BASE_URL}${pathOrUrl.replace(/^\//, '')}`
      : pathOrUrl
  }
  return `${SITE_URL}${pathOrUrl}`
}

export function seo({
  title,
  description,
  image = DEFAULT_SHARE_IMAGE,
  type = 'website',
}: {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const img = absoluteUrl(image)

  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:image', content: img },
    { property: 'og:image:alt', content: fullTitle },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: img },
    // Pinterest reads Open Graph tags for Rich Pins; this hint opts saves into the format.
    { name: 'pinterest-rich-pin', content: 'true' },
  ]
}
