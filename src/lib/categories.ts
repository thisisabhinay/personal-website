export const categories = [
  { name: 'Game Systems Engineering', slug: 'game-systems-engineering' },
  { name: 'Frontend Systems at Depth', slug: 'frontend-systems' },
  { name: 'AI × Games', slug: 'ai-games' },
] as const;

export type CategoryName = (typeof categories)[number]['name'];

export function getCategorySlug(name: string): string {
  return categories.find((c) => c.name === name)?.slug ?? name;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
