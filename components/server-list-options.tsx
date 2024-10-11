import {
	type ServerFilterOptions,
	ServerListFilters,
} from "@/components/server-list-filters";
import type { ConstructorHook } from "@/utils/react/types/hook";

export const ServerListOptions: ConstructorHook["callback"] = (
	target,
	self,
	args,
) => {
	const [props] = args;
	const { translate, options, setOptions, isLoading = false } = props;
	const [selectedRegion, setSelectedRegion] = useState<string>();
	const previousRegion = useRef(selectedRegion);

	useEffect(() => {
		const debounceId = setTimeout(() => {
			if (isLoading || previousRegion.current === selectedRegion) return;

			setOptions((prevState: ServerFilterOptions) => ({
				...prevState,
				selectedRegion,
			}));
			previousRegion.current = selectedRegion;
		}, 1000);

		return () => clearTimeout(debounceId);
	}, [selectedRegion, isLoading]);

	return (
		<div
			className="server-list-options"
			style={{ gap: "12px", marginTop: "6px", marginBottom: "6px" }}
		>
			<div style={{ display: "flex" }}>
				<label className="select-label text-label" htmlFor="sort-select">
					Number of Players
				</label>

				<div className="rbx-select-group select-group">
					<select
						onChange={(e) => {
							setOptions((prevState: ServerFilterOptions) => ({
								...prevState,
								sortOrder: e.currentTarget.value,
							}));
						}}
						disabled={isLoading}
						value={options.sortOrder}
						id="sort-select"
						data-testid="sort-select"
						className="input-field rbx-select select-option"
					>
						<option value={"Desc"}>Descending</option>
						<option value={"Asc"}>Ascending</option>
					</select>
					<span className="icon-arrow icon-down-16x16" />
				</div>
			</div>

			<div className="checkbox" style={{ margin: 0 }}>
				<input
					onChange={(e) => {
						setOptions((prevState: ServerFilterOptions) => ({
							...prevState,
							excludeFullGames: e.currentTarget.checked,
						}));
					}}
					disabled={isLoading}
					type="checkbox"
					id="filter-checkbox"
					data-testid="filter-checkbox"
					checked={options.excludeFullGames}
				/>

				<label className="checkbox-label text-label" htmlFor="filter-checkbox">
					Hide Full Servers
				</label>
			</div>

			<div className="input-group">
				<input
					className="input-field new-input-field"
					style={{ borderRadius: "8px" }}
					maxLength={120}
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck={false}
					placeholder="Server region"
					disabled={isLoading}
					onChange={(e) => {
						setSelectedRegion(e.currentTarget.value);
					}}
				/>
			</div>

			<ServerListFilters setOptions={setOptions} />
		</div>
	);
};
