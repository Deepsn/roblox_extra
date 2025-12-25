import { parse_asset } from "r-extra-explorer-parser-wasm";
import { Instance } from "@/utils/explorer/instance";

export async function downloadAsset(assetId: string): Promise<Instance> {
	const instanceData = await parse_asset(assetId);

	return new Instance(instanceData);
}
