import { z } from "astro:content";

const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.string().trim(),
	author: z.string().trim(),
	draft: z.boolean().optional(),
	tags: z.array(z.string()),
	image: z.string().optional(),
	pubDate: z.coerce.date(),
});

export default blogSchema;
