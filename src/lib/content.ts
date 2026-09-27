import { allPosts, type Post } from 'content-collections'

export type { Post }

export function getAllPosts(): Post[] {
  return [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPost(): Post | undefined {
  const posts = getAllPosts()
  return posts.find((post) => post.featured) ?? posts[0]
}

export function getLatestPosts(excludeSlug?: string, limit = 6): Post[] {
  return getAllPosts()
    .filter((post) => post.slug !== excludeSlug)
    .slice(0, limit)
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

export function getCategories(): string[] {
  return Array.from(new Set(allPosts.map((post) => post.category))).sort()
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((other) => other.slug !== post.slug && other.category === post.category)
    .slice(0, limit)
}

export function searchPosts(posts: Post[], query: string): Post[] {
  const q = query.trim().toLowerCase()
  if (!q) return posts
  return posts.filter((post) =>
    [post.title, post.summary, post.category].some((field) => field.toLowerCase().includes(q)),
  )
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
