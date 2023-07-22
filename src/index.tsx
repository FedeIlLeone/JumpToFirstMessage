import type { MessagesProps } from "@types";
import JumpToTopBar from "./components/JumpToTopBar";
import Settings from "./components/Settings";
import { cfg } from "./utils/PluginSettingsUtils";

let stopped = false;

export function _renderJumpToTopBar(props: MessagesProps): React.ReactNode {
  const { channel, messages, unreadCount } = props;

  const forumsOnly = cfg.get("forumsOnly");
  // @ts-expect-error discord-types is terribly outdated
  if (forumsOnly && !channel.isForumPost()) return null;

  return stopped ? null : (
    <JumpToTopBar channel={channel} messages={messages} unreadCount={unreadCount} />
  );
}

export { Settings, cfg };

export function start(): void {
  stopped = false;
}

export function stop(): void {
  stopped = true;
}
