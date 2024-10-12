import { Icon } from "@/components/icon";
import { PlayerThumbnailContainer } from "@/components/player-thumbnail-container";
import { useAsyncEffect } from "@/hooks/use-async-effect";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ServerRegion } from "@/utils/messaging/server-info";
import InfoIcon from "~/assets/icons/info.svg";
import PlayArrowIcon from "~/assets/icons/play_arrow.svg";

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
}: { [key: string]: any }) {
	const { Tooltip } = ReactStyleGuide;
	const [serverRegion, setServerRegion] = useState<ServerRegion>();

	// Return if not checking public servers
	if (serverListType !== "") return;

	const update = useUpdate();

	useAsyncEffect(async () => {
		const serverRegion = await sendMessagesOnInjected("getServerRegion", {
			placeId: placeId,
			gameId: id,
		});

		setServerRegion(serverRegion);
	}, []);

	function handleServerJoin() {
		Roblox.GameLauncher.joinGameInstance(placeId, id);
	}

	const percent = Math.round((currentPlayersCount / maxPlayers) * 100);
	const remainingPlayersText =
		currentPlayersCount - players.length > 0 &&
		`+${currentPlayersCount - players.length}`;

	return (
		<li
			className={`rbx-${cssKey}game-server-item`}
			style={{ width: "calc(50% - 6px)" }}
		>
			<div
				className="card-item"
				style={{
					minHeight: "auto",
					margin: 0,
					flexDirection: "row",
					justifyContent: "flex-start",
					gap: "6px",
				}}
			>
				<div
					data-placeid={placeId}
					style={{
						width: "7%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
						alignItems: "center",
						marginLeft: "12px",
						marginRight: "12px",
					}}
				>
					<button
						style={{
							border: "none",
							background: "none",
							padding: 0,
						}}
						className={`rbx-${cssKey}game-server-join`}
						onClick={handleServerJoin}
						disabled={isLoading || currentPlayersCount >= maxPlayers}
						type="button"
					>
						<Icon url={PlayArrowIcon} alt="play server" />
					</button>

					<span style={{ border: "none", background: "none", padding: 0 }}>
						<Tooltip
							id={`${cssKey}-tooltip`}
							content={
								<div>
									<p>Ping: {ping}</p>
									<p>Load: {100 - Math.floor((fps / 60) * 100)}%</p>
								</div>
							}
							placement="bottom"
						>
							<Icon url={InfoIcon} width={20} height={20} alt="server info" />
						</Tooltip>
					</span>
				</div>

				<div
					style={{
						display: "flex",
						width: "100%",
						padding: "0 6px 0 6px",
						flexDirection: "column",
						rowGap: "12px",
					}}
				>
					<div
						className="player-thumbnails-container"
						style={{ maxWidth: "none", alignSelf: "auto" }}
					>
						{players.map(
							(player: {
								playerToken: string;
								displayName: string;
								id: string;
								name: string;
							}) => (
								<PlayerThumbnailContainer
									key={player.playerToken}
									player={player}
								/>
							),
						)}
						{!!remainingPlayersText && (
							<span className="avatar avatar-headshot-sm player-avatar hidden-players-placeholder">
								{remainingPlayersText}
							</span>
						)}
					</div>

					<div>
						<p>{gameServerStatus}</p>
						{serverRegion ? (
							<p>{`${serverRegion.region.location} - ${serverRegion.region.country}`}</p>
						) : (
							<p>Unknown - N/A</p>
						)}
					</div>
				</div>
			</div>

			<div
				className="server-player-count-gauge border"
				style={{ margin: 0, border: "none" }}
			>
				<div
					className="gauge-inner-bar border"
					style={{ width: `${percent}%` }}
				/>
			</div>
		</li>
	);
}
