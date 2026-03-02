export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
