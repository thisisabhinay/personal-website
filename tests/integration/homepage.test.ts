import { describe, it, expect } from 'vitest';
import { loadPage } from '../helpers/html';

describe('homepage', () => {
  it('has exactly one h1 with name', () => {
    const $ = loadPage('/');
    const h1s = $('h1');
    expect(h1s.length).toBe(1);
    expect(h1s.first().text()).toContain('Abhinay Thakur');
  });

  it('has Software Engineer subheading', () => {
    const $ = loadPage('/');
    expect($('body').text()).toContain('Software Engineer');
  });

  it('has profile image placeholder', () => {
    const $ = loadPage('/');
    expect($('img[alt="Abhinay Thakur"]').length).toBe(1);
  });

  it('has social links', () => {
    const $ = loadPage('/');
    expect($('a[href*="github.com"]').length).toBeGreaterThan(0);
    expect($('a[href*="linkedin.com"]').length).toBeGreaterThan(0);
    expect($('a[href*="youtube.com"]').length).toBeGreaterThan(0);
  });

  it('has Recent Posts section', () => {
    const $ = loadPage('/');
    expect($('body').text()).toContain('Recent Posts');
  });

  it('has post cards with time elements', () => {
    const $ = loadPage('/');
    const times = $('time[datetime]');
    expect(times.length).toBeGreaterThan(0);
    times.each((_, el) => {
      expect($(el).attr('datetime')).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('has All Posts link to /blog', () => {
    const $ = loadPage('/');
    const allPostsLink = $('a').filter((_, el) => $(el).text().includes('All Posts'));
    expect(allPostsLink.attr('href')).toBe('/blog');
  });

  it('has navigation with correct links', () => {
    const $ = loadPage('/');
    const nav = $('nav[aria-label="Main navigation"]');
    expect(nav.length).toBe(1);
    expect(nav.find('a[href="/"]').length).toBe(1);
    expect(nav.find('a[href="/blog"]').length).toBe(1);
    expect(nav.find('a[href="/about"]').length).toBe(1);
  });
});
