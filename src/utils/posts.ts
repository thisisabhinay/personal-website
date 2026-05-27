import { getCollection } from "astro:content";

// Only return posts without `draft: true` in the frontmatter
export const latestPosts = (
	await getCollection("blog", ({ data }) => {
		return data.draft !== true;
	})
).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
