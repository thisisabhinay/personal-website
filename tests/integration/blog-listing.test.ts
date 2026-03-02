import { describe, it, expect } from 'vitest';
import { loadPage } from '../helpers/html';

describe('blog index page', () => {
  it('has h1 Blog', () => {
    const $ = loadPage('/blog');
    expect($('h1').first().text()).toContain('Blog');
  });

  it('has year navigation tabs', () => {
    const $ = loadPage('/blog');
    const yearLinks = $('nav a');
    const years = yearLinks.map((_, el) => $(el).text().trim()).get();
    expect(years).toContain('2026');
    expect(years).toContain('2025');
  });

  it('shows only latest year posts on index', () => {
    const $ = loadPage('/blog');
    const times = $('time[datetime]');
    times.each((_, el) => {
      const date = $(el).attr('datetime')!;
      expect(date.startsWith('2026')).toBe(true);
    });
  });
});

describe('year archive page /blog/2025', () => {
  it('shows only 2025 posts', () => {
    const $ = loadPage('/blog/2025');
    const times = $('time[datetime]');
    expect(times.length).toBeGreaterThan(0);
    times.each((_, el) => {
      const date = $(el).attr('datetime')!;
      expect(date.startsWith('2025')).toBe(true);
    });
  });

  it('has back navigation to newer year', () => {
    const $ = loadPage('/blog/2025');
    const backLink = $('a[href="/blog/2026"]');
    expect(backLink.length).toBeGreaterThan(0);
  });
});

describe('year archive page /blog/2026', () => {
  it('has forward navigation to older year', () => {
    const $ = loadPage('/blog/2026');
    const nextLink = $('a[href="/blog/2025"]');
    expect(nextLink.length).toBeGreaterThan(0);
  });
});
