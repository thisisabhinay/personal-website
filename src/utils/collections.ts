export type CollectionMeta = {
	label: string;
	description: string;
};

const collectionMeta: Record<string, CollectionMeta> = {
	thoughts: {
		label: "Thoughts",
		description: "Reflections on life, learning, and the creative process.",
	},
	tutorial: {
		label: "Tutorial",
		description: "Step-by-step guides and hands-on walkthroughs.",
	},
};

export function formatCollectionName(slug: string): string {
	if (collectionMeta[slug]) return collectionMeta[slug].label;
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function getCollectionDescription(slug: string): string | undefined {
	return collectionMeta[slug]?.description;
}

export function getAllCollections(): Array<{ slug: string } & CollectionMeta> {
	return Object.entries(collectionMeta).map(([slug, meta]) => ({
		slug,
		...meta,
	}));
}
