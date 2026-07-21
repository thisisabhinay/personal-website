import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
	site: "https://abhinaythakur.com",
	devToolbar: {
		enabled: false,
	},
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		mdx(),
		icon(),
		sitemap(),
	],
});
