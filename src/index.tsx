import type { MessagesProps } from "@types";
import { common } from "replugged";
import JumpToTopBar from "./components/JumpToTopBar";

const { constants } = common;

let stopped = false;

export function _renderJumpToTopBar(props: MessagesProps): React.ReactNode {
  const { channel, messages } = props;

  if (
    channel.type !== constants.ChannelTypes.PUBLIC_THREAD &&
    channel.type !== constants.ChannelTypes.PRIVATE_THREAD
  ) {
    return null;
  }

  return stopped ? null : <JumpToTopBar channel={channel} messages={messages} />;
}

export function start(): void {
  stopped = false;
}

export function stop(): void {
  stopped = true;
}
