export function PlayerThumbnailContainer({
	player,
}: { player: { playerToken: string; displayName: string; id: string } }) {
	const { Link } = ReactStyleGuide;
	const { Thumbnail2d, ThumbnailTypes } = RobloxThumbnails;
	const { urlService } = CoreUtilities;

	const getUserProfileUrl = (userId: string) =>
		urlService.getAbsoluteUrl(`/users/${userId}/profile`);

	return (
		<span
			key={player.playerToken}
			className="avatar avatar-headshot-sm player-avatar"
		>
			{player.id == null ? (
				<Thumbnail2d
					type={ThumbnailTypes.avatarHeadshot}
					token={player.playerToken}
					containerClass="avatar-card-image"
				/>
			) : (
				<Link className="avatar-card-link" href={getUserProfileUrl(player.id)}>
					<Thumbnail2d
						type={ThumbnailTypes.avatarHeadshot}
						targetId={player.id}
						containerClass="avatar-card-image"
						altName={player.displayName}
					/>
				</Link>
			)}
		</span>
	);
}
