import { hookConstructor } from "@/utils/react/hook-constructor";
import type { ConstructorHook } from "@/utils/react/types/hook";

const GameInstanceCard: ConstructorHook["callback"] = (element, props) => {
	console.log("args", element, props);
};

export default defineUnlistedScript(async () => {
	console.log("loading react");

	await waitForObject(window, "React");

	console.log("react loaded");

	hookConstructor((props) => !!props?.gameInstances, GameInstanceCard);
});
