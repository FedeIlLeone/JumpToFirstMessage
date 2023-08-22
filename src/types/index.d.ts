import type { Channel, Message } from "discord-types/general";
import type { ChannelMessages } from "replugged/dist/renderer/modules/common/messages";
import type { CloudUpload } from "./CloudUpload";

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
interface FileUpload {
  attachmentsCount: number;
  channelId: string;
  compressionProgress: number;
  currentSize: number;
  draftContent: string;
  hasImage: boolean;
  hasVideo: boolean;
  id: string;
  items: CloudUpload[];
  name: string;
  progress: number;
  rate: number;
  totalPreCompressionSize: number;
}

export interface MessagesProps {
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
  uploads: FileUpload[];
}
