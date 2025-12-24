import type { ExplorerProtocol } from "@/utils/messaging/explorer";
import type { ServerRegionProtocol } from "@/utils/messaging/server-info";

export interface MessengersProtocol extends ServerRegionProtocol, ExplorerProtocol {}
