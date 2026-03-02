// Polyfill globals missing in Node.js 18 that undici (cheerio dep) expects
import { Blob } from 'node:buffer';

if (typeof globalThis.File === 'undefined') {
  // @ts-expect-error minimal File shim for undici compatibility
  globalThis.File = class File extends Blob {
    name: string;
    lastModified: number;
    constructor(chunks: BlobPart[], name: string, opts?: FilePropertyBag) {
      super(chunks, opts);
      this.name = name;
      this.lastModified = opts?.lastModified ?? Date.now();
    }
  };
}
