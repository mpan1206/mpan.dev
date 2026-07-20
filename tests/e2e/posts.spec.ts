import { expect, test } from '@playwright/test'

test.describe('Posts listing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts/')
  })

  test('loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/posts\//)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays post cards', async ({ page }) => {
    // At least one article/post card should be present
    const cards = page.locator('article, [data-testid="post-card"], a[href^="/posts/"]')
    await expect(cards.first()).toBeVisible()
  })

  test('post links point to /posts/ routes', async ({ page }) => {
    // Select post links excluding the listing page itself
    const postLinks = page.locator('a[href^="/posts/"]:not([href="/posts/"])')
    const count = await postLinks.count()
    expect(count).toBeGreaterThan(0)

    // Check first link is a valid post URL
    const firstHref = await postLinks.first().getAttribute('href')
    expect(firstHref).toMatch(/^\/posts\/.+\/$/)
  })
})

test.describe('Post detail page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/posts/introducing-astro/')
  })

  test('loads successfully', async ({ page }) => {
    await expect(page).not.toHaveURL(/404/)
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
  })

  test('has a single h1 heading', async ({ page }) => {
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)
  })

  test('has readable content area', async ({ page }) => {
    // The main content area should exist and contain text
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('shows reading time', async ({ page }) => {
    // Reading time should appear somewhere on the page
    const readingTime = page.getByText(/分钟阅读/)
    await expect(readingTime).toBeVisible()
  })

  test('has a back button or back navigation', async ({ page }) => {
    // Back to posts or back button
    const backLink = page.locator('a[href="/posts/"]').first()
    await expect(backLink).toBeVisible()
  })

  test('navigating back goes to posts list', async ({ page }) => {
    const backLink = page.locator('a[href="/posts/"]').first()
    await backLink.click()
    await expect(page).toHaveURL(/\/posts\/$/)
  })
})

test.describe('Post navigation: clicking from list to detail', () => {
  test('clicking a post card opens the post', async ({ page }) => {
    await page.goto('/posts/')

    // Find the first post link that isn't the listing itself
    const postLinks = page
      .locator('a[href^="/posts/"]')
      .filter({ hasNot: page.locator('[href="/posts/"]') })
    const firstLink = postLinks.first()
    const href = await firstLink.getAttribute('href')

    await firstLink.click()
    await expect(page).toHaveURL(new RegExp(href!.replace(/\//g, '\\/')))

    // Post detail should have an h1
    await expect(page.locator('h1')).toBeVisible()
  })
})
