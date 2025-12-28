import { GameInstanceCard } from "@/components/game-instance-card";
import { type ExtendedServerOptions, ServerListOptions } from "@/components/server-list-options";
import type { ServerInstance } from "@/types/games";
import type { ConstructorHook } from "@/utils/react/types/hook";
import { gameInstanceConstants } from "@/utils/server/constants/resources";

export const GameListSection: ConstructorHook["callback"] = (element, props) => {
	// const [props] = args;
	const {
		gameInstances,
		handleGameInstanceShutdownAtIndex,
		headerTitle,
		isLoading,
		loadMoreGameInstances,
		loadingError,
		placeId,
		refreshGameInstances,
		setIsLoading,
		showLoadMoreButton,
		translate,
		type,
		userCanManagePlace,
	} = props;

	const { createSystemFeedback, Loading, Button } = ReactStyleGuide;
	const [SystemFeedback, systemFeedbackService] = createSystemFeedback();
	const cssKey = type ? `${type}-` : "";

	const emptyGameInstanceList = gameInstances.length === 0;
	const footerClass = `rbx-${cssKey}running-games-footer`;
	const id = `rbx-${cssKey}running-games`;
	const itemContainerClass = `card-list rbx-${cssKey}game-server-item-container`;
	const itemContainerId = `rbx-${cssKey}game-server-item-container`;

	const displayedGameInstances = useMemo<ServerInstance[]>(() => {
		const extraGameInstances = gameInstances.length % 4;
		if (extraGameInstances > 0 && showLoadMoreButton) {
			return gameInstances.slice(0, -1 * extraGameInstances);
		}
		return gameInstances;
	}, [gameInstances, showLoadMoreButton]);

	const [options, setOptions] = useState<Partial<ExtendedServerOptions>>(gameInstanceConstants.defaultOptions);

	useEffect(() => {
		refreshGameInstances?.(options);
	}, [options]);

	if (type === "") return;

	return (
		<>
			<SystemFeedback />
			<div id={id} className="stack server-list-section" data-placeid={placeId} data-showshutdown>
				{headerTitle && (
					<div className="container-header">
						<div className="server-list-container-header">
							<h2 className="server-list-header">
								{headerTitle} - {gameInstances.length} servers
							</h2>

							<Button
								className="btn-more rbx-refresh refresh-link-icon"
								isDisabled={isLoading}
								onClick={() => refreshGameInstances(options)}
								size={Button.sizes.extraSmall}
								variant={Button.variants.control}
							>
								{translate(gameInstanceConstants.resources.privateServerRefreshText) || "Refresh"}
							</Button>
						</div>
						{type === "" && (
							<ServerListOptions
								{...{
									isLoading,
									options,
									setOptions,
									translate,
								}}
							/>
						)}
					</div>
				)}

				{isLoading ? (
					<Loading />
				) : emptyGameInstanceList ? (
					<div className="section-content-off empty-game-instances-container">
						<p className="no-servers-message">
							{loadingError
								? translate(gameInstanceConstants.resources.loadServersError) || "Unable to load servers."
								: translate(gameInstanceConstants.resources.noServersFoundText)}
						</p>
					</div>
				) : (
					<>
						<ul
							id={itemContainerId}
							className={itemContainerClass}
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "12px",
								flexFlow: "wrap",
							}}
						>
							{displayedGameInstances.map(
								(
									{
										accessCode,
										id: instanceId,
										maxPlayers,
										name,
										owner,
										pfs, // TODO(SHARE-414): Is this information that we actually get from the backend? Let's remove if not.
										players,
										playing,
										vipServerId,
										vipServerSubscription,
										fps,
										ping,
									}: ServerInstance,
									index,
								) => {
									// Return if not checking public servers
									if (type === "") return undefined;

									return (
										<GameInstanceCard
											key={instanceId}
											{...{
												accessCode,
												canManagePlace: userCanManagePlace,
												cssKey,
												currentPlayersCount: playing || players.length,
												gameServerStatus: translate(gameInstanceConstants.resources.playerCountText, {
													currentPlayers: playing || players.length,
													maximumAllowedPlayers: maxPlayers,
												}),
												id: instanceId,
												isLoading,
												maxPlayers,
												name,
												onShutdownServerSuccess: () => {
													handleGameInstanceShutdownAtIndex(index);
												},
												owner,
												placeId,
												players,
												serverListType: type,
												setIsLoading,
												showSlowGameMessage: (pfs as number) < gameInstanceConstants.slowGameFpsThreshold,
												systemFeedbackService,
												translate,
												vipServerId,
												vipServerSubscription,
												fps,
												ping,
											}}
										/>
									);
								},
							)}
						</ul>

						<div className={footerClass}>
							{showLoadMoreButton && (
								<Button
									className="rbx-running-games-load-more"
									isDisabled={isLoading}
									onClick={() => loadMoreGameInstances(options)}
									type="button"
									variant={Button.variants.control}
									width={Button.widths.full}
								>
									{translate(gameInstanceConstants.resources.loadMoreButtonText)}
								</Button>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};
