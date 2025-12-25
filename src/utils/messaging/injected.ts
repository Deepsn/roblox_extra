import type { GetDataType, GetReturnType, MaybePromise, RemoveListenerCallback } from "@webext-core/messaging";
import type { MessengersProtocol } from "@/utils/messaging/protocols";

function createMessageExchangeIds(type: string) {
	const messageId = `RE_${type}`;
	const sendId = `${messageId}_SEND`;
	const receiveId = `${messageId}_RECEIVE`;

	return { sendId, receiveId };
}

export function sendMessagesOnInjected<T extends keyof MessengersProtocol>(
	type: T,
	data: GetDataType<MessengersProtocol[T]>,
): Promise<GetReturnType<MessengersProtocol[T]>> {
	const key = Math.random().toString(10);
	const { sendId, receiveId } = createMessageExchangeIds(type);
	const event = new CustomEvent(sendId, { detail: { data, key } });
	const timeout = 5000; // timeout should be low

	const promise = new Promise<GetReturnType<MessengersProtocol[T]>>((resolve, reject) => {
		const receiveListener: EventListenerOrEventListenerObject = (_event) => {
			const event = _event as CustomEvent<typeof promise>;
			clearTimeout(timeoutId);
			resolve(event.detail);
		};

		const timeoutId = setTimeout(() => {
			document.removeEventListener(receiveId + key, receiveListener);
			reject(new Error("Message exchange timed out"));
		}, timeout);

		document.addEventListener(receiveId + key, receiveListener, {
			once: true,
		});
	});

	document.dispatchEvent(event);
	return promise;
}

export function onMessagesFromInjected<T extends keyof MessengersProtocol>(
	type: T,
	onReceived: (data: GetDataType<MessengersProtocol[T]>) => void | MaybePromise<GetReturnType<MessengersProtocol[T]>>,
): RemoveListenerCallback {
	const { sendId, receiveId } = createMessageExchangeIds(type);

	const send = (data: GetReturnType<MessengersProtocol[T]> | void, key: string) => {
		const receiveEvent = new CustomEvent(receiveId + key, { detail: data });
		document.dispatchEvent(receiveEvent);
	};

	document.addEventListener(sendId, async (_event) => {
		// Fix event type
		const event = _event as CustomEvent<{
			data: GetDataType<MessengersProtocol[T]>;
			key: string;
		}>;

		let data = onReceived(event.detail.data);

		if (data instanceof Promise) {
			data = await data;
		}

		send(data, event.detail.key);
	});

	return () => {};
}
