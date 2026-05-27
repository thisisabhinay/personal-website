import { z } from "astro:content";

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	collections: z.array(z.string()).default([]),
	author: z.string().trim(),
	draft: z.boolean().optional(),
	tags: z.array(z.string()).default([]),
	image: z.string().optional(),
	pubDate: z.coerce.date(),
	contentType: z.enum(["article", "video"]).default("article"),
	videoUrl: z.string().optional(),
	duration: z.string().optional(),
});

export default blogSchema;
