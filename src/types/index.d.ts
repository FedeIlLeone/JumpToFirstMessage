import type { Channel } from "discord-types/general";
import type { ChannelMessages } from "replugged/dist/renderer/modules/common/messages";

type Comparator<T> = (a: T, b: T) => boolean;

type ChannelStreamTypes =
  | "MESSAGE"
  | "MESSAGE_GROUP_BLOCKED"
  | "MESSAGE_GROUP_SPAMMER"
  | "THREAD_STARTER_MESSAGE"
  | "DIVIDER"
  | "JUMP_TARGET"
  | "FORUM_POST_ACTION_BAR"
  | "MESSAGE_GROUP"
  | "DIVIDER_TIME_STAMP"
  | "DIVIDER_NEW_MESSAGES";

interface ChannelStream {
  content?: string | Message;
  contentKey?: string;
  flashKey?: string;
  groupId?: string;
  isHighlight?: boolean;
  isSummaryDivider?: boolean;
  jumpTarget?: boolean;
  key?: string;
  type: ChannelStreamTypes;
  unreadId?: string;
}

interface MessagesProps {
  canChat?: boolean;
  channel: Channel;
  channelStream: ChannelStream[];
  className?: string;
  editingMessageId: string | undefined;
  filterAfterTimestamp: number | undefined;
  fontSize: number;
  hasUnreads: boolean;
  keyboardModeEnabled: boolean;
  messageDisplayCompact: boolean;
  messageGroupSpacing: number;
  messages: ChannelMessages;
  permissionVersion?: number;
  scrollerClassName?: string;
  showingQuarantineBanner: boolean;
  showingSpamBanner: boolean;
  showNewMessagesBar: boolean;
  unreadCount: number;
  /** This hasn't been typed yet */
  uploads: unknown[];
}
