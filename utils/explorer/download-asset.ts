import { Instance } from "@/utils/explorer/instance";

// TODO: actually download/parse assets using wasm
export function downloadAsset(assetId: string): Instance {
	return new Instance({
		name: "root",
		children: [
			{
				name: "test",
				source: "local test = 123123123",
			},
			{
				name: "Part",
			},
			{
				name: "Folder",
				children: [
					{
						name: "SubFolder",
						children: [
							{
								name: "SubSubFolder",
								children: [
									{
										name: "SubSubSubFolder",
									},
								],
							},
						],
					},
				],
			},
		],
	});
}
