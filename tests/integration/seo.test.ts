import { describe, it, expect } from 'vitest';
import { loadPage } from '../helpers/html';

const pages = ['/', '/about', '/blog', '/blog/2025'];
const articlePages = [
  '/blog/sample-post',
  '/blog/game-server-architecture-in-go',
  '/blog/ecs-pattern-in-game-engines',
  '/blog/state-synchronization-deep-dive',
];

describe('SEO meta tags — all pages', () => {
  for (const page of [...pages, ...articlePages]) {
    describe(page, () => {
      it('has title containing site name', () => {
        const $ = loadPage(page);
        expect($('title').text()).toContain('Abhinay Thakur');
      });

      it('has meta description', () => {
        const $ = loadPage(page);
        const desc = $('meta[name="description"]').attr('content');
        expect(desc).toBeTruthy();
        expect(desc!.length).toBeGreaterThan(0);
      });

      it('has robots meta', () => {
        const $ = loadPage(page);
        expect($('meta[name="robots"]').attr('content')).toBe('index, follow');
      });

      it('has author meta', () => {
        const $ = loadPage(page);
        expect($('meta[name="author"]').attr('content')).toBe('Abhinay Thakur');
      });

      it('has canonical link', () => {
        const $ = loadPage(page);
        const canonical = $('link[rel="canonical"]').attr('href');
        expect(canonical).toMatch(/^https:\/\/abhinaythakur\.com\//);
      });

      it('has Open Graph tags', () => {
        const $ = loadPage(page);
        expect($('meta[property="og:title"]').attr('content')).toBeTruthy();
        expect($('meta[property="og:description"]').attr('content')).toBeTruthy();
        expect($('meta[property="og:url"]').attr('content')).toBeTruthy();
        expect($('meta[property="og:site_name"]').attr('content')).toBe('Abhinay Thakur');
      });

      it('has RSS feed link', () => {
        const $ = loadPage(page);
        expect($('link[rel="alternate"][type="application/rss+xml"]').attr('href')).toBe('/rss.xml');
      });

      it('has favicon links', () => {
        const $ = loadPage(page);
        expect($('link[rel="icon"]').length).toBeGreaterThan(0);
      });
    });
  }
});

describe('SEO meta tags — article pages', () => {
  for (const page of articlePages) {
    describe(page, () => {
      it('has og:type article', () => {
        const $ = loadPage(page);
        expect($('meta[property="og:type"]').attr('content')).toBe('article');
      });

      it('has article:published_time', () => {
        const $ = loadPage(page);
        const time = $('meta[property="article:published_time"]').attr('content');
        expect(time).toBeTruthy();
        expect(new Date(time!).getTime()).not.toBeNaN();
      });

      it('has JSON-LD Article schema', () => {
        const $ = loadPage(page);
        const script = $('script[type="application/ld+json"]').html();
        expect(script).toBeTruthy();
        const data = JSON.parse(script!);
        expect(data['@type']).toBe('Article');
        expect(data.headline).toBeTruthy();
        expect(data.author?.name).toBe('Abhinay Thakur');
      });
    });
  }
});

describe('SEO meta tags — homepage', () => {
  it('has JSON-LD WebSite schema', () => {
    const $ = loadPage('/');
    const script = $('script[type="application/ld+json"]').html();
    expect(script).toBeTruthy();
    const data = JSON.parse(script!);
    expect(data['@type']).toBe('WebSite');
    expect(data.name).toBe('Abhinay Thakur');
  });
});
