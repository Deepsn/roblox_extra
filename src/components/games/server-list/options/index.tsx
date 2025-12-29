import { Icon } from "@/components/icon";
import type { Options } from "@/types/games";
import PublicIcon from "~/assets/icons/public.svg";

export type ExtendedServerOptions = Options & {
	filters?: string[];
	sorters?: string[];
	[key: string]: unknown;
};

const FILTERS = [
	{ value: "smallest", label: "Smallest server" },
	{ value: "best_ping", label: "Best ping" },
	{ value: "lowest_server", label: "Lowest server" },
];

export function ServerListOptions(props: { [key: string]: any }) {
	const { options, setOptions, isLoading = false } = props;
	const [showFilters, setShowFilters] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setShowFilters(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggleFilter = (value: string) => {
		if (isLoading) return;

		setOptions((prev: ExtendedServerOptions) => {
			const currentFilters = prev.filters || [];
			const newFilters = currentFilters.includes(value)
				? currentFilters.filter((f) => f !== value)
				: [...currentFilters, value];
			return { ...prev, filters: newFilters };
		});
	};

	return (
		<div
			className="server-list-options"
			style={{
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				gap: "12px",
				marginTop: "12px",
				marginBottom: "12px",
			}}
		>
			<div
				className="input-group input-field new-input-field"
				style={{
					padding: 0,
					flex: "1 1 200px",
					minWidth: "200px",
					display: "flex",
					alignItems: "center",
					height: "38px",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "40px",
						height: "100%",
						pointerEvents: "none",
					}}
				>
					<Icon url={PublicIcon} width={20} height={20} />
				</div>

				<input
					style={{
						flex: 1,
						paddingRight: "12px",
						background: "none",
						border: "none",
						height: "100%",
						outline: "none",
					}}
					maxLength={120}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck={false}
					placeholder="Server region"
					disabled={isLoading}
					value={options.selectedRegion || ""}
					onChange={(e) => {
						const value = e.currentTarget.value;
						setOptions((prevState: ExtendedServerOptions) => ({
							...prevState,
							selectedRegion: value,
						}));
					}}
				/>
			</div>

			<div style={{ flex: "0 0 auto", position: "relative" }} ref={dropdownRef}>
				<button
					type="button"
					className="input-field"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "0 12px",
						cursor: "pointer",
						height: "38px",
						borderRadius: "8px",
						border: "none",
						backgroundColor: "rgba(255, 255, 255, 0.05)",
						color: "white",
					}}
					onClick={() => setShowFilters(!showFilters)}
					disabled={isLoading}
				>
					<span style={{ fontSize: "14px", fontWeight: 500 }}>Filters</span>
					<span className={`icon-arrow icon-${showFilters ? "up" : "down"}-16x16`} />
				</button>

				{showFilters && (
					<div
						style={{
							position: "absolute",
							top: "calc(100% + 8px)",
							left: 0,
							zIndex: 1000,
							backgroundColor: "#232527",
							border: "1px solid #393b3d",
							borderRadius: "8px",
							padding: "8px",
							minWidth: "220px",
							boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
						}}
					>
						{FILTERS.map((filter) => {
							const isSelected = options.filters?.includes(filter.value);
							return (
								<button
									key={filter.value}
									type="button"
									onClick={() => toggleFilter(filter.value)}
									style={{
										padding: "8px 12px",
										cursor: "pointer",
										display: "flex",
										border: "none",
										alignItems: "center",
										gap: "10px",
										borderRadius: "4px",
										backgroundColor: isSelected ? "rgba(255, 255, 255, 0.1)" : "transparent",
										color: isSelected ? "#fff" : "#bdbebf",
										transition: "background-color 0.2s",
									}}
								>
									<div
										style={{
											width: "16px",
											height: "16px",
											border: isSelected ? "none" : "1px solid #bdbebf",
											borderRadius: "4px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: isSelected ? "#00b06f" : "transparent",
										}}
									>
										{isSelected && (
											<span
												style={{
													fontSize: "12px",
													color: "white",
													fontWeight: "bold",
													lineHeight: 1,
												}}
											>
												✓
											</span>
										)}
									</div>
									<span style={{ fontSize: "14px" }}>{filter.label}</span>
								</button>
							);
						})}
					</div>
				)}
			</div>

			<div
				className="checkbox"
				style={{
					margin: 0,
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					userSelect: "none",
				}}
			>
				<input
					onChange={(e) => {
						setOptions((prevState: ExtendedServerOptions) => ({
							...prevState,
							excludeFullGames: e.currentTarget.checked,
						}));
					}}
					disabled={isLoading}
					type="checkbox"
					id="filter-checkbox"
					data-testid="filter-checkbox"
					checked={options.excludeFullGames}
					style={{ cursor: "pointer" }}
				/>

				<label
					className="checkbox-label text-label"
					htmlFor="filter-checkbox"
					style={{ cursor: "pointer", marginLeft: "8px" }}
				>
					Hide Full Servers
				</label>
			</div>
		</div>
	);
}
