import { readdir, readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const BLOG_DIR = "src/content/blog";
const COVERS_DIR = "public/assets/blog/covers";
const COVER_WIDTH = 1200;
const COVER_QUALITY = 95;
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 85;

async function fileExists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

async function run() {
	await mkdir(COVERS_DIR, { recursive: true });

	const files = await readdir(BLOG_DIR);
	const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

	let processed = 0;
	let skipped = 0;

	for (const file of mdxFiles) {
		const filePath = join(BLOG_DIR, file);
		const content = await readFile(filePath, "utf-8");

		const imageMatch = content.match(/^image:\s*["']?(https?:\/\/[^\s"']+)["']?/m);
		if (!imageMatch) {
			skipped++;
			continue;
		}

		const externalUrl = imageMatch[1];
		const slug = file.replace(/\.mdx$/, "");
		const coverPath = join(COVERS_DIR, `${slug}.webp`);
		const thumbPath = join(COVERS_DIR, `thumbnail_${slug}.webp`);

		if (await fileExists(coverPath) && await fileExists(thumbPath)) {
			skipped++;
			continue;
		}

		console.log(`Processing: ${slug}`);
		try {
			const response = await fetch(externalUrl);
			if (!response.ok) {
				console.warn(`  Failed to download: ${response.status} ${externalUrl}`);
				continue;
			}

			const buffer = Buffer.from(await response.arrayBuffer());

			await sharp(buffer)
				.resize(COVER_WIDTH)
				.webp({ quality: COVER_QUALITY })
				.toFile(coverPath);

			await sharp(buffer)
				.resize(THUMB_WIDTH)
				.webp({ quality: THUMB_QUALITY })
				.toFile(thumbPath);

			const localPath = `/assets/blog/covers/${slug}.webp`;
			const updatedContent = content.replace(
				imageMatch[0],
				`image: "${localPath}"`,
			);
			await writeFile(filePath, updatedContent, "utf-8");

			processed++;
			console.log(`  Saved cover + thumbnail, updated frontmatter`);
		} catch (err) {
			console.warn(`  Error processing ${slug}:`, err.message);
		}
	}

	console.log(`\nDone. Processed: ${processed}, Skipped: ${skipped}`);
}

run().catch(console.error);
