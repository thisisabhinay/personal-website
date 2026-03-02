import { test, expect } from '@playwright/test';

test.describe('dark mode', () => {
  test('toggle button exists with aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Toggle dark mode' })).toBeVisible();
  });

  test('clicking toggle adds dark class to html', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole('button', { name: 'Toggle dark mode' }).click();
    await expect(html).toHaveClass(/dark/);
  });

  test('clicking toggle again removes dark class', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle dark mode' });
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('dark mode persists after reload', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle dark mode' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('respects prefers-color-scheme dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('light mode when prefers-color-scheme light and no saved preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
