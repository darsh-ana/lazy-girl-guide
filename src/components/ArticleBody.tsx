import { marked } from 'marked'
import { ProductCard, type ArticleProduct } from './ProductCard'

const PRODUCT_MARKER = /\{\{product:\s*([a-zA-Z0-9-]+)\s*\}\}/g

export function ArticleBody({
  content,
  products,
}: {
  content: string
  products: ArticleProduct[]
}) {
  const parts = content.split(PRODUCT_MARKER)
  const nodes: React.ReactNode[] = []

  parts.forEach((part, index) => {
    // split() with a capturing group alternates: text, id, text, id, ...
    const isMarker = index % 2 === 1

    if (!isMarker) {
      const trimmed = part.trim()
      if (!trimmed) return
      nodes.push(
        <div
          key={`text-${index}`}
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: marked.parse(trimmed) as string }}
        />,
      )
      return
    }

    const product = products.find((p) => p.id === part)
    if (product) {
      nodes.push(<ProductCard key={`product-${part}-${index}`} product={product} />)
    }
  })

  return <>{nodes}</>
}
