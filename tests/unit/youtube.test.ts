import { describe, it, expect } from 'vitest';
import { getYouTubeEmbedUrl } from '../../src/lib/youtube';

describe('getYouTubeEmbedUrl', () => {
  it('extracts embed URL from standard youtube.com watch URL', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  it('extracts embed URL from youtu.be short URL', () => {
    expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ'))
      .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
  });

  it('extracts video ID ignoring extra params', () => {
    expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=abc123&t=120&list=PLxyz'))
      .toBe('https://www.youtube.com/embed/abc123');
  });

  it('works without https prefix', () => {
    expect(getYouTubeEmbedUrl('youtube.com/watch?v=test123'))
      .toBe('https://www.youtube.com/embed/test123');
  });

  it('returns null for non-YouTube URL', () => {
    expect(getYouTubeEmbedUrl('https://vimeo.com/123456')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(getYouTubeEmbedUrl('')).toBeNull();
  });

  it('returns null for null input', () => {
    expect(getYouTubeEmbedUrl(null as unknown as string)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(getYouTubeEmbedUrl(undefined as unknown as string)).toBeNull();
  });

  it('returns null for random string', () => {
    expect(getYouTubeEmbedUrl('not a url at all')).toBeNull();
  });
});
