import type { Channel, Guild } from "discord-types/general";
import { webpack } from "replugged";

interface ChannelSummariesExperimentMod {
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
  useGuildEligibleForSummaries: (guild: Guild, track?: boolean) => boolean;
}

export default await webpack.waitForProps<ChannelSummariesExperimentMod>("canSeeChannelSummaries");
