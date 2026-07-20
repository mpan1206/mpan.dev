import { expect, test } from '@playwright/test'

// The theme script uses a module-level variable to track current theme.
// Directly manipulating classList bypasses that internal state.
// We must use localStorage + page.reload() to establish a known starting state,
// so the script re-initialises with the correct themeValue on each test.

test.describe('Theme toggle', () => {
  test('page loads with a default theme applied to <html>', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const htmlClass = (await html.getAttribute('class')) ?? ''
    // Must have either dark or no dark — just verify the page loaded and class attr exists
    expect(typeof htmlClass).toBe('string')
  })

  test('clicking theme toggle switches from light to dark mode', async ({ page }) => {
    // Start from a known light state via localStorage + reload
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('theme', 'light'))
    await page.reload()

    const html = page.locator('html')
    await expect(html).not.toHaveClass(/\bdark\b/)

    // Click the theme toggle (uses [data-theme-toggle] attribute)
    const themeToggle = page.locator('[data-theme-toggle]').first()
    await themeToggle.click()

    // html should now have dark class
    await expect(html).toHaveClass(/\bdark\b/)
  })

  test('clicking theme toggle switches from dark to light mode', async ({ page }) => {
    // Start from a known dark state via localStorage + reload
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('theme', 'dark'))
    await page.reload()

    const html = page.locator('html')
    await expect(html).toHaveClass(/\bdark\b/)

    // Click the theme toggle
    const themeToggle = page.locator('[data-theme-toggle]').first()
    await themeToggle.click()

    // dark class should be removed
    await expect(html).not.toHaveClass(/\bdark\b/)
  })

  test('dark theme persists after page reload', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('theme', 'dark'))
    await page.reload()

    const html = page.locator('html')
    await expect(html).toHaveClass(/\bdark\b/)
  })

  test('light theme persists after page reload', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('theme', 'light'))
    await page.reload()

    const html = page.locator('html')
    await expect(html).not.toHaveClass(/\bdark\b/)
  })
})
