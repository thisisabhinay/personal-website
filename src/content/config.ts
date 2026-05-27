import { defineCollection } from "astro:content";
import { blogSchema, portfolioSchema } from "../schema";

const BlogPosts = defineCollection({
	schema: blogSchema,
});

const Portfolio = defineCollection({
	schema: portfolioSchema,
});

export const collections = {
	blog: BlogPosts,
	portfolio: Portfolio,
};
