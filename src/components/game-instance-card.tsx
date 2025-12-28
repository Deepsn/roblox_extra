import { Icon } from "@/components/icon";
import { PlayerThumbnailContainer } from "@/components/player-thumbnail-container";
import { useAsyncEffect } from "@/hooks/use-async-effect";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ServerRegion } from "@/utils/messaging/server-info";
import ContentCopyIcon from "~/assets/icons/content_copy.svg";

export function GameInstanceCard({
	id,
	translate,
	cssKey,
	serverListType,
	placeId,
	gameServerStatus,
	canManagePlace,
	name,
	vipServerId,
	vipServerSubscription,
	accessCode,
	showSlowGameMessage,
	owner,
	players,
	onShutdownServerSuccess,
	systemFeedbackService,
	isLoading,
	setIsLoading,
	maxPlayers,
	currentPlayersCount,
	ping,
	fps,
}: {
	[key: string]: any;
}) {
	const { Tooltip } = ReactStyleGuide;
	const [serverRegion, setServerRegion] = useState<ServerRegion>();

	function handleServerJoin() {
		Roblox.GameLauncher.joinGameInstance(placeId, id);
	}

	function handleCopyId() {
		window.navigator.clipboard.writeText(id);
	}

	useAsyncEffect(async () => {
		const serverRegion = await sendMessagesOnInjected("getServerRegion", {
			placeId: placeId,
			gameId: id,
		});

		setServerRegion(serverRegion);
	}, []);

	const percent = Math.round((currentPlayersCount / maxPlayers) * 100);
	const remainingPlayersText = currentPlayersCount - players.length > 0 && `+${currentPlayersCount - players.length}`;

	return (
		<li className={`rbx-${cssKey}game-server-item`} style={{ width: "calc(25% - 10px)" }}>
			<div
				className="card-item"
				style={{
					minHeight: "auto",
					margin: 0,
					padding: "12px",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						fontSize: "12px",
						lineHeight: "1.2",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
						{serverRegion ? (
							<span className="text-secondary" style={{ fontWeight: 600 }}>
								{serverRegion.location}, {serverRegion.country}
							</span>
						) : (
							<span className="text-secondary">Loading region...</span>
						)}
					</div>

					<div style={{ textAlign: "right", display: "flex", gap: "8px", alignItems: "center" }}>
						{ping !== undefined && (
							<span className={ping > 200 ? "text-error" : "text-secondary"} title="Ping">
								{ping} ms
							</span>
						)}
						{fps !== undefined && (
							<span className="text-secondary" title="Server FPS">
								{Math.round(fps)} FPS
							</span>
						)}
					</div>
				</div>

				<div
					className="player-thumbnails-container"
					style={{ maxWidth: "none", flexWrap: "wrap", gap: "4px", alignContent: "flex-start" }}
				>
					{players.map((player: { playerToken: string; displayName: string; id: string; name: string }) => (
						<PlayerThumbnailContainer key={player.playerToken} player={player} />
					))}
					{!!remainingPlayersText && (
						<span className="avatar avatar-headshot-sm player-avatar hidden-players-placeholder">
							{remainingPlayersText}
						</span>
					)}
				</div>

				{gameServerStatus && (
					<div className="text-secondary" style={{ fontSize: "16px" }}>
						{gameServerStatus}
					</div>
				)}

				<div style={{ marginTop: "auto", width: "100%" }}>
					<div
						style={{
							marginBottom: "8px",
							height: "6px",
							backgroundColor: "rgba(128, 128, 128, 0.2)",
							borderRadius: "3px",
							overflow: "hidden",
							width: "100%",
						}}
						title={`${percent}% Full`}
					>
						<div
							style={{
								width: `${percent}%`,
								height: "100%",
								backgroundColor: percent > 90 ? "#d9534f" : percent > 60 ? "#f0ad4e" : "#5cb85c",
							}}
						/>
					</div>

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<button
							className="btn-growth-md btn-primary-md"
							style={{
								flex: 1,
								fontSize: "14px",
								padding: "4px 0",
								height: "32px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							onClick={handleServerJoin}
							disabled={isLoading}
							type="button"
						>
							Join
						</button>

						<button
							className="btn-control-md"
							style={{
								width: "32px",
								height: "32px",
								padding: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							onClick={handleCopyId}
							type="button"
						>
							<Tooltip content="Copy Job ID" placement="top">
								<Icon width={16} height={16} url={ContentCopyIcon} alt="copy id" />
							</Tooltip>
						</button>
					</div>
				</div>
			</div>
		</li>
	);
}
