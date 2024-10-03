import type { MessengersProtocol } from "@/utils/messaging/protocols";
import { defineExtensionMessaging } from "@webext-core/messaging";

export const { sendMessage, onMessage } =
	defineExtensionMessaging<MessengersProtocol>();
