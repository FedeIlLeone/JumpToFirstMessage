import type { MessagesProps } from "@types";
import JumpToTopBar from "./components/JumpToTopBar";

let stopped = false;

export function _renderJumpToTopBar(props: MessagesProps): React.ReactNode {
  const { channel, messages } = props;

  return stopped ? null : <JumpToTopBar channel={channel} messages={messages} />;
}

export function start(): void {
  stopped = false;
}

export function stop(): void {
  stopped = true;
}
