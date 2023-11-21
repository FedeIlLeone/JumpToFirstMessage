import type { Channel, Guild } from "discord-types/general";
import { webpack } from "replugged";

interface ChannelSummariesExperiment {
  canGuildUseConversationSummaries: (guild: Guild, checkIfIsEnabled?: boolean) => boolean;
  canSeeChannelSummaries: (
    channel: Channel,
    ignoreChannelSettings?: boolean,
    checkIfIsEnabled?: boolean,
  ) => boolean;
  channelEligibleForSummaries: (channel: Channel) => boolean;
  useChannelSummariesExperiment: (
    channel: Channel,
    track?: boolean,
    ignoreChannelSettings?: boolean,
  ) => boolean;
}

export default await webpack.waitForProps<ChannelSummariesExperiment>("canSeeChannelSummaries");
