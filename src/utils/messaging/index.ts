import { defineExtensionMessaging } from "@webext-core/messaging";
import type { MessengersProtocol } from "@/utils/messaging/protocols";

export const { sendMessage, onMessage } = defineExtensionMessaging<MessengersProtocol>();
