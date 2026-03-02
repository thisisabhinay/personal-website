import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test('home page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Abhinay Thakur/);
  });

  test('nav links are present', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('click Blog nav goes to /blog', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Blog');
  });

  test('click About nav goes to /about', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await nav.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('About');
  });

  test('click All Posts link goes to /blog', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'All Posts' }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);
  });

  test('click post card navigates to post', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const firstPostLink = page.getByRole('listitem').first().getByRole('link').first();
    const href = await firstPostLink.getAttribute('href');
    await firstPostLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(new RegExp(href!.replace(/\//g, '\\/')));
    await expect(page.getByRole('article').getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('click category badge navigates to category page', async ({ page }) => {
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'Game Systems Engineering' }).click();
    await expect(page).toHaveURL(/\/category\//);
  });

  test('click tag navigates to tag page', async ({ page }) => {
    await page.goto('/blog/ecs-pattern-in-game-engines');
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('link', { name: 'ecs' }).click();
    await expect(page).toHaveURL(/\/tag\//);
  });

  test('year pagination tabs work', async ({ page }) => {
    await page.goto('/blog');
    await page.getByRole('link', { name: '2025', exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/2025\/?$/);
  });
});
