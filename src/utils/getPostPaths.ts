/**
 * Returns a fully navigable URL for use in `<a href>`, RSS links, and sitemaps.
 * e.g. `/posts/my-post/`
 */
export function getPostUrl(id: string): string {
  return `/posts/${id}/`
}
