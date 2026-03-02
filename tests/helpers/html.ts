import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import * as cheerio from 'cheerio';

const DIST_DIR = resolve(process.cwd(), 'dist');

export function loadPage(pagePath: string): cheerio.CheerioAPI {
  const filePath = pagePath === '/'
    ? resolve(DIST_DIR, 'index.html')
    : resolve(DIST_DIR, pagePath.replace(/^\//, ''), 'index.html');
  const html = readFileSync(filePath, 'utf-8');
  return cheerio.load(html);
}

export function pageExists(pagePath: string): boolean {
  const filePath = pagePath === '/'
    ? resolve(DIST_DIR, 'index.html')
    : resolve(DIST_DIR, pagePath.replace(/^\//, ''), 'index.html');
  return existsSync(filePath);
}

export function fileExists(relativePath: string): boolean {
  return existsSync(resolve(DIST_DIR, relativePath));
}
