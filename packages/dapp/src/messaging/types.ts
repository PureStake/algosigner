export type OnMessageListener = (
  this: MessagePort,
  event: MessageEvent
) => void;
