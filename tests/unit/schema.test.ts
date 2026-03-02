import { describe, it, expect } from 'vitest';
import { z } from 'astro/zod';

// Replicate the schema from src/content/config.ts for unit testing
// (Astro's defineCollection isn't importable outside Astro context)
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  category: z.enum([
    'Game Systems Engineering',
    'Frontend Systems at Depth',
    'AI × Games',
  ]),
  tags: z.array(z.string()).optional(),
  thumbnail: z.string().optional(),
  contentType: z.enum(['article', 'video']).default('article'),
  videoUrl: z.string().optional(),
  duration: z.string().optional(),
});

describe('blog content schema', () => {
  const validArticle = {
    title: 'Test Post',
    description: 'A test description',
    pubDate: new Date('2026-01-01'),
    category: 'Game Systems Engineering' as const,
  };

  it('accepts valid article frontmatter', () => {
    const result = blogSchema.safeParse(validArticle);
    expect(result.success).toBe(true);
  });

  it('defaults contentType to article when omitted', () => {
    const result = blogSchema.parse(validArticle);
    expect(result.contentType).toBe('article');
  });

  it('accepts valid video frontmatter', () => {
    const result = blogSchema.safeParse({
      ...validArticle,
      contentType: 'video',
      videoUrl: 'https://youtube.com/watch?v=abc',
      duration: '45:12',
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional tags array', () => {
    const result = blogSchema.safeParse({
      ...validArticle,
      tags: ['go', 'multiplayer'],
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional thumbnail', () => {
    const result = blogSchema.safeParse({
      ...validArticle,
      thumbnail: '/images/thumb.jpg',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing title', () => {
    const { title, ...noTitle } = validArticle;
    const result = blogSchema.safeParse(noTitle);
    expect(result.success).toBe(false);
  });

  it('rejects missing description', () => {
    const { description, ...noDesc } = validArticle;
    const result = blogSchema.safeParse(noDesc);
    expect(result.success).toBe(false);
  });

  it('rejects missing pubDate', () => {
    const { pubDate, ...noDate } = validArticle;
    const result = blogSchema.safeParse(noDate);
    expect(result.success).toBe(false);
  });

  it('rejects missing category', () => {
    const { category, ...noCat } = validArticle;
    const result = blogSchema.safeParse(noCat);
    expect(result.success).toBe(false);
  });

  it('rejects invalid category value', () => {
    const result = blogSchema.safeParse({
      ...validArticle,
      category: 'Invalid Category',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid contentType value', () => {
    const result = blogSchema.safeParse({
      ...validArticle,
      contentType: 'podcast',
    });
    expect(result.success).toBe(false);
  });

  it('accepts all three valid categories', () => {
    for (const cat of ['Game Systems Engineering', 'Frontend Systems at Depth', 'AI × Games']) {
      const result = blogSchema.safeParse({ ...validArticle, category: cat });
      expect(result.success).toBe(true);
    }
  });
});
