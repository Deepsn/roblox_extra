import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@/components/icon";
import type { ExtendedServerOptions } from "@/components/server-list-options";
import PersonRemoveIcon from "~/assets/icons/person_remove.svg";
import SortIcon from "~/assets/icons/sort.svg";
import WifiIcon from "~/assets/icons/wifi.svg";

export function ServerListSorts({ setOptions }: { setOptions: Dispatch<SetStateAction<ExtendedServerOptions>> }) {
	const { Dropdown } = ReactStyleGuide;

	return (
		<Dropdown
			style={{ flex: 1 }}
			id="server-list-sorts"
			currSelectionLabel={
				<p>
					<Icon url={SortIcon} width={25} height={25} /> Sorts
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
			<Dropdown.Item id="smallest">
				<Icon url={PersonRemoveIcon} width={20} height={20} /> Smallest servers
			</Dropdown.Item>
			<Dropdown.Item id="bestPing">
				<Icon url={WifiIcon} width={20} height={20} /> Best ping
			</Dropdown.Item>
			<Dropdown.Item id="lowestLoad">Lowest server load</Dropdown.Item>
		</Dropdown>
	);
}
