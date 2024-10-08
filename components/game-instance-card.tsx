import { PlayerThumbnailContainer } from "@/components/player-thumbnail-container";
import { useAsyncEffect } from "@/hooks/use-async-effect";
import { sendMessagesOnInjected } from "@/utils/messaging/injected";
import type { ServerRegion } from "@/utils/messaging/server-info";
import type { ConstructorHook } from "@/utils/react/types/hook";
import InfoIcon from "~/assets/icons/info.svg";
import PlayArrowIcon from "~/assets/icons/play_arrow.svg";

export const GameInstanceCard: ConstructorHook["callback"] = (
	target,
	self,
	args,
) => {
	const [props] = args;
	const { Tooltip } = ReactStyleGuide;

	const [serverRegion, setServerRegion] = useState<ServerRegion>();

	const {
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
	} = props;

	// Return if not checking public servers
	if (serverListType !== "") return;

	useAsyncEffect(async () => {
		const serverRegion = await sendMessagesOnInjected("getServerRegion", {
			placeId: placeId,
			gameId: id,
		});

		setServerRegion(serverRegion);
		console.log("game instance", props);
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
						<img
							src={PlayArrowIcon}
							style={{ height: 30, width: 30 }}
							alt="play server"
						/>
					</button>

					<span style={{ border: "none", background: "none", padding: 0 }}>
						<Tooltip
							id={`${cssKey}-tooltip`}
							content={"omg"}
							placement="bottom"
						>
							<img
								src={InfoIcon}
								style={{ height: 20, width: 20 }}
								alt="refresh server"
							/>
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
};
