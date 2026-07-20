import { expect, test } from '@playwright/test'

test.describe('Site navigation', () => {
  test('navigates between home, posts, and projects', async ({ page }) => {
    await page.goto('/')

    // Home → Posts
    await page.getByRole('link', { name: '文章' }).first().click()
    await expect(page).toHaveURL(/\/posts\//)

    // Posts → Projects
    await page.getByRole('link', { name: '项目' }).first().click()
    await expect(page).toHaveURL(/\/projects\//)

    // Projects → Home (logo click)
    const logoLink = page.locator('header a[href="/"]').first()
    await logoLink.click()
    await expect(page).toHaveURL('/')
  })

  test('browser back/forward works after navigating', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '文章' }).first().click()
    await expect(page).toHaveURL(/\/posts\//)

    await page.goBack()
    await expect(page).toHaveURL('/')

    await page.goForward()
    await expect(page).toHaveURL(/\/posts\//)
  })
})

test.describe('404 page', () => {
  test('shows 404 for a non-existent route', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/')
    // Either 404 status or the 404 page content
    const status = response?.status()
    const body = await page.content()

    const is404 = status === 404 || body.includes('404') || body.toLowerCase().includes('not found')
    expect(is404).toBe(true)
  })

  test('404 page has a link back to home', async ({ page }) => {
    await page.goto('/this-page-does-not-exist/')
    // There should be a way back to home
    const homeLink = page.locator('a[href="/"]').first()
    await expect(homeLink).toBeVisible()
  })
})

test.describe('Back to top button', () => {
  test('back to top button appears after scrolling', async ({ page }) => {
    await page.goto('/posts/frontend-evolution/')

    // Scroll down significantly
    await page.evaluate(() => window.scrollTo(0, 1000))

    // Back to top button should become visible (target the button inside the wrapper)
    const backToTop = page.locator('#back-to-top button')
    await expect(backToTop).toBeVisible({ timeout: 3000 })
  })
})

test.describe('RSS feed', () => {
  test('RSS feed is accessible', async ({ page }) => {
    const response = await page.goto('/rss.xml')
    expect(response?.status()).toBe(200)

    const contentType = response?.headers()['content-type']
    expect(contentType).toContain('xml')
  })
})

test.describe('Robots.txt', () => {
  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)
  })
})
