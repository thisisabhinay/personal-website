import { describe, it, expect } from 'vitest';
import { loadPage } from '../helpers/html';

describe('article post page', () => {
  const $ = loadPage('/blog/ecs-pattern-in-game-engines');

  it('has h1 with post title', () => {
    expect($('h1').first().text()).toContain('Entity Component System');
  });

  it('has article semantic element', () => {
    expect($('article').length).toBe(1);
  });

  it('has time element with datetime', () => {
    const time = $('header time[datetime]');
    expect(time.length).toBe(1);
    expect(time.attr('datetime')).toBe('2025-08-12');
  });

  it('has category badge link', () => {
    const link = $('a[href="/category/game-systems-engineering"]');
    expect(link.length).toBeGreaterThan(0);
  });

  it('has tag links', () => {
    expect($('a[href="/tag/ecs"]').length).toBeGreaterThan(0);
  });

  it('has collapsible table of contents', () => {
    expect($('details').length).toBe(1);
    expect($('details summary').text()).toContain('Table of Contents');
  });

  it('TOC contains heading links with anchors', () => {
    const tocLinks = $('details nav a');
    expect(tocLinks.length).toBeGreaterThan(0);
    tocLinks.each((_, el) => {
      expect($(el).attr('href')).toMatch(/^#/);
    });
  });

  it('has prose content with headings', () => {
    expect($('.prose h2').length).toBeGreaterThan(0);
  });
});

describe('video post page', () => {
  const $ = loadPage('/blog/state-synchronization-deep-dive');

  it('has h1 with video title', () => {
    expect($('h1').first().text()).toContain('State Synchronization');
  });

  it('has YouTube embed iframe', () => {
    const iframe = $('iframe');
    expect(iframe.length).toBe(1);
    expect(iframe.attr('src')).toContain('youtube.com/embed');
  });

  it('shows duration in header', () => {
    const headerText = $('header').text();
    expect(headerText).toContain('45:12');
  });

  it('has transcript section', () => {
    expect($('body').text()).toContain('Transcript');
  });

  it('has timestamped segments', () => {
    expect($('body').text()).toContain('[00:00]');
    expect($('body').text()).toContain('[05:15]');
  });
});
