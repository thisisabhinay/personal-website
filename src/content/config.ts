import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
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
  }),
});

export const collections = { blog };
