import type { Message } from "discord-types/general";
import { webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

interface ForumPostState {
  firstMessage: Message | null;
  loaded: boolean;
}

export interface ForumPostMessagesStore extends Store {
  isLoading: (threadId: string) => boolean;
  getMessage: (threadId: string) => ForumPostState;
}

export default webpack.getByStoreName<ForumPostMessagesStore>("ForumPostMessagesStore")!;
