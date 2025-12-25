import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@/components/icon";
import type { ExtendedServerOptions } from "@/components/server-list-options";
import FilterIcon from "~/assets/icons/filter.svg";
import PersonRemoveIcon from "~/assets/icons/person_remove.svg";
import WifiIcon from "~/assets/icons/wifi.svg";

export function ServerListFilters({
	setOptions,
	isLoading,
}: {
	setOptions: Dispatch<SetStateAction<ExtendedServerOptions>>;
	isLoading: boolean;
}) {
	const { Dropdown } = ReactStyleGuide;

	return (
		<Dropdown
			disabled={isLoading}
			style={{ flex: 1 }}
			id="server-list-filters"
			currSelectionLabel={
				<p>
					<Icon url={FilterIcon} width={25} height={25} /> Filters
				</p>
			}
			onSelect={(_: any, event: Event) => {
				const id = (event.target as HTMLElement | undefined)?.id;
				if (!id) return;

				setOptions((prevState) => {
					if (prevState.filters?.includes(id)) {
						return {
							...prevState,
							filters: prevState.filters.filter((value) => value !== id),
						};
					}

					return {
						...prevState,
						filters: [...(prevState.filters ?? []), id],
					};
				});
			}}
			size="sm"
			autoClose="outside"
		>
			<Dropdown.Item disabled={isLoading} id="smallest">
				<Icon url={PersonRemoveIcon} width={20} height={20} /> Smallest servers
			</Dropdown.Item>
			<Dropdown.Item disabled={isLoading} id="bestPing">
				<Icon url={WifiIcon} width={20} height={20} /> Best ping
			</Dropdown.Item>
			<Dropdown.Item disabled={isLoading} id="lowestLoad">
				Lowest server load
			</Dropdown.Item>
		</Dropdown>
	);
}
