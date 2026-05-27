export function getYouTubeId(url: string): string {
	const match = url.match(
		/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
	);
	return match?.[1] ?? "";
}

export function getYouTubeThumbnail(url: string): string {
	const id = getYouTubeId(url);
	return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : "";
}
