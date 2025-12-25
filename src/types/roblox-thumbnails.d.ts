import type { ReactElement } from "react";

interface RobloxThumbnails {
	Thumbnail2d: ({
		type,
		targetId,
		token,
		size,
		imgClassName,
		containerClass,
		format,
		altName,
		onLoad,
		getThumbnail,
	}: {
		type: string;
		token?: string;
		targetId?: string;
		size?: string;
		imgClassName?: string;
		containerClass?: string;
		format?: string;
		altName?: string;
		onLoad?: () => void;
		getThumbnail?: () => string;
	}) => ReactElement;
	ThumbnailTypes: {
		avatar: "Avatar";
		avatarHeadshot: "AvatarHeadshot";
		gameIcon: "GameIcon";
		gameThumbnail: "GameThumbnail";
		badgeIcon: "BadgeIcon";
		gamePassIcon: "GamePass";
		assetThumbnail: "Asset";
		bundleThumbnail: "BundleThumbnail";
		userOutfit: "Outfit";
		groupIcon: "GroupIcon";
		developerProductIcon: "DeveloperProduct";
		universeThumbnail: "UniverseThumbnail";
		universeThumbnails: "UniverseThumbnails";
		placeGameIcon: "PlaceGameIcon";
	};
}
