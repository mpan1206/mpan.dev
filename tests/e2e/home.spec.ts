import { expect, test } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('loads successfully with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/MPan/)
  })

  test('has a header with navigation links', async ({ page }) => {
    const header = page.getByRole('banner')
    await expect(header).toBeVisible()

    const postsLink = header.getByRole('link', { name: '文章' })
    await expect(postsLink).toBeVisible()
    await expect(postsLink).toHaveAttribute('href', '/posts/')

    const projectsLink = header.getByRole('link', { name: '项目' })
    await expect(projectsLink).toBeVisible()
    await expect(projectsLink).toHaveAttribute('href', '/projects/')
  })

  test('navigates to posts page from nav link', async ({ page }) => {
    await page.getByRole('link', { name: '文章' }).first().click()
    await expect(page).toHaveURL(/\/posts\//)
  })

  test('navigates to projects page from nav link', async ({ page }) => {
    await page.getByRole('link', { name: '项目' }).first().click()
    await expect(page).toHaveURL(/\/projects\//)
  })

  test('has a footer', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('has no broken heading hierarchy (single h1)', async ({ page }) => {
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)
  })
})
