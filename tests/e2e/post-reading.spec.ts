import { test, expect } from '@playwright/test';

test.describe('post reading experience', () => {
  test('article renders with full content', async ({ page }) => {
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Entity Component System');
    await expect(page.getByRole('article')).toBeVisible();
    // Check a known heading from the content
    await expect(page.getByRole('heading', { name: 'The Problem with Inheritance' })).toBeVisible();
  });

  test('table of contents expands on click', async ({ page }) => {
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');

    const tocGroup = page.locator('details');
    const tocNav = tocGroup.getByRole('navigation');

    // TOC should be collapsed initially
    await expect(tocNav).not.toBeVisible();

    // Click summary to expand
    await tocGroup.getByText('Table of Contents').click();
    await expect(tocNav).toBeVisible();

    // Should contain heading links
    const tocLinks = tocNav.getByRole('link');
    expect(await tocLinks.count()).toBeGreaterThan(0);
  });

  test('TOC link scrolls to section', async ({ page }) => {
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');
    await page.getByText('Table of Contents').click();

    const firstLink = page.locator('details').getByRole('navigation').getByRole('link').first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click();

    // URL should update with hash
    await expect(page).toHaveURL(new RegExp(href!.replace('#', '\\#')));
  });

  test('video post has YouTube embed', async ({ page }) => {
    await page.goto('/blog/state-synchronization-deep-dive');
    await page.waitForLoadState('domcontentloaded');
    const iframe = page.locator('iframe');
    await expect(iframe).toBeVisible();
    const src = await iframe.getAttribute('src');
    expect(src).toContain('youtube.com/embed');
  });

  test('code blocks are present', async ({ page }) => {
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');
    const codeBlocks = page.getByRole('code');
    const count = await codeBlocks.count();
    // Fall back to pre selector if role doesn't match
    if (count === 0) {
      expect(await page.locator('pre').count()).toBeGreaterThan(0);
    } else {
      expect(count).toBeGreaterThan(0);
    }
  });
});
