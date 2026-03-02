import { describe, it, expect } from 'vitest';
import { pageExists, fileExists } from '../helpers/html';

describe('route generation', () => {
  it('generates homepage', () => {
    expect(pageExists('/')).toBe(true);
  });

  it('generates about page', () => {
    expect(pageExists('/about')).toBe(true);
  });

  it('generates blog index', () => {
    expect(pageExists('/blog')).toBe(true);
  });

  it('generates year archive pages', () => {
    expect(pageExists('/blog/2026')).toBe(true);
    expect(pageExists('/blog/2025')).toBe(true);
  });

  it('generates all blog post pages', () => {
    expect(pageExists('/blog/sample-post')).toBe(true);
    expect(pageExists('/blog/state-synchronization-deep-dive')).toBe(true);
    expect(pageExists('/blog/game-server-architecture-in-go')).toBe(true);
    expect(pageExists('/blog/ecs-pattern-in-game-engines')).toBe(true);
  });

  it('generates category pages', () => {
    expect(pageExists('/category/game-systems-engineering')).toBe(true);
    expect(pageExists('/category/frontend-systems')).toBe(true);
    expect(pageExists('/category/ai-games')).toBe(true);
  });

  it('generates tag pages', () => {
    expect(pageExists('/tag/go')).toBe(true);
    expect(pageExists('/tag/multiplayer')).toBe(true);
    expect(pageExists('/tag/architecture')).toBe(true);
    expect(pageExists('/tag/ecs')).toBe(true);
  });

  it('generates sitemap', () => {
    expect(fileExists('sitemap-index.xml')).toBe(true);
  });
});
