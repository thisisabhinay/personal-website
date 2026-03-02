import { describe, it, expect } from 'vitest';
import { categories, getCategorySlug, getCategoryBySlug } from '../../src/lib/categories';

describe('categories', () => {
  it('has exactly 3 categories', () => {
    expect(categories).toHaveLength(3);
  });

  it('each category has name and slug', () => {
    for (const cat of categories) {
      expect(cat.name).toBeTruthy();
      expect(cat.slug).toBeTruthy();
    }
  });
});

describe('getCategorySlug', () => {
  it('returns slug for Game Systems Engineering', () => {
    expect(getCategorySlug('Game Systems Engineering')).toBe('game-systems-engineering');
  });

  it('returns slug for Frontend Systems at Depth', () => {
    expect(getCategorySlug('Frontend Systems at Depth')).toBe('frontend-systems');
  });

  it('returns slug for AI × Games', () => {
    expect(getCategorySlug('AI × Games')).toBe('ai-games');
  });

  it('falls back to original name for unknown category', () => {
    expect(getCategorySlug('Unknown Category')).toBe('Unknown Category');
  });

  it('falls back for empty string', () => {
    expect(getCategorySlug('')).toBe('');
  });
});

describe('getCategoryBySlug', () => {
  it('returns category for game-systems-engineering', () => {
    const result = getCategoryBySlug('game-systems-engineering');
    expect(result).toBeDefined();
    expect(result?.name).toBe('Game Systems Engineering');
    expect(result?.slug).toBe('game-systems-engineering');
  });

  it('returns category for frontend-systems', () => {
    const result = getCategoryBySlug('frontend-systems');
    expect(result?.name).toBe('Frontend Systems at Depth');
  });

  it('returns category for ai-games', () => {
    const result = getCategoryBySlug('ai-games');
    expect(result?.name).toBe('AI × Games');
  });

  it('returns undefined for unknown slug', () => {
    expect(getCategoryBySlug('nonexistent')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(getCategoryBySlug('')).toBeUndefined();
  });
});
