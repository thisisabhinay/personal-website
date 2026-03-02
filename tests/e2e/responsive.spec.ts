import { test, expect } from '@playwright/test';

test.describe('responsive layout', () => {
  test('mobile: content is visible and nav works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('tablet: layout renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  });

  test('desktop: content has constrained width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const mainBox = await page.getByRole('main').boundingBox();
    expect(mainBox).toBeTruthy();
    expect(mainBox!.width).toBeLessThan(1280);
  });

  test('mobile: blog page is readable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Blog');
    await expect(page.getByRole('listitem').first()).toBeVisible();
  });

  test('mobile: post page is readable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('article')).toBeVisible();
  });
});
