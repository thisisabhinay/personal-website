import { test, expect } from '@playwright/test';

test.describe('blog browsing', () => {
  test('blog page shows latest year posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Blog');
    const times = page.locator('time[datetime]');
    const count = await times.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const datetime = await times.nth(i).getAttribute('datetime');
      expect(datetime).toMatch(/^2026/);
    }
  });

  test('2025 tab shows only 2025 posts', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('link', { name: '2025', exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/2025/);
    const times = page.locator('time[datetime]');
    const count = await times.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const datetime = await times.nth(i).getAttribute('datetime');
      expect(datetime).toMatch(/^2025/);
    }
  });

  test('category page shows filtered posts', async ({ page }) => {
    await page.goto('/category/frontend-systems');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Frontend Systems at Depth');
    await expect(page.getByRole('listitem').first()).toBeVisible();
  });

  test('tag page shows filtered posts', async ({ page }) => {
    await page.goto('/tag/multiplayer');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('#multiplayer');
    await expect(page.getByRole('listitem').first()).toBeVisible();
  });

  test('video post card has play icon', async ({ page }) => {
    await page.goto('/');
    const videoCard = page.getByRole('link', { name: /State Synchronization/ });
    await expect(videoCard).toBeVisible();
    // Video card should have SVG play icon(s)
    await expect(videoCard.locator('svg').first()).toBeVisible();
  });
});
