import { RobloxThumbnails } from "@/routes/background/main";

interface IThumbnailData {
	id: number;
	imageUrl: string;
}

interface IThumbnailQuery {
	id: number;
	size?: string;
	type?: string;
}

export async function getThumbnails(thumbnailQuery: IThumbnailQuery[]) {
	if (thumbnailQuery.length === 0) {
		return null;
	}

	const responseData: IThumbnailData[] = [];

	for (const query of thumbnailQuery) {
		const queryId = query.id;
		const size = query.size ?? RobloxThumbnails.DefaultThumbnailSize;
		const type = query.type ?? RobloxThumbnails.ThumbnailTypes.avatarHeadshot;

		const thumbnailResponse = await RobloxThumbnails.thumbnailService.getThumbnailImage(type, size, null, queryId);

		responseData.push({
			id: queryId,
			...thumbnailResponse.thumbnail,
		});
	}

	return responseData;
}

export async function getThumbnail(thumbnailQuery: IThumbnailQuery) {
	return (await getThumbnails([thumbnailQuery]))?.[0];
}
