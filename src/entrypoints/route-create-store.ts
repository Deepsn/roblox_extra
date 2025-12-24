import { ExplorerButton } from "@/components/create/store/explorer-button";
import { hookConstructor } from "@/utils/react/hook-constructor";

export default defineUnlistedScript(async () => {
	console.log("stores");

	hookConstructor(
		(props) => {
			return !!props?.assetId && !!props.assetName && !!props.assetTypeId;
		},
		(element, props) => {
			element.props.children.push(ExplorerButton(props));
		},
	);
});
