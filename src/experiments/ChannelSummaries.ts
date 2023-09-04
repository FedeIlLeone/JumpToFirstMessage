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

const mod = await webpack.waitForModule(webpack.filters.bySource("2023-02_p13n_summarization"));

export default {
  canGuildUseConversationSummaries: webpack.getFunctionBySource(mod, "SUMMARIES_ENABLED_BY_USER"),
  canSeeChannelSummaries: webpack.getFunctionBySource(mod, "SUMMARIES_DISABLED"),
  channelEligibleForSummaries: webpack.getFunctionBySource(mod, /return \w\(\w,!/),
  useChannelSummariesExperiment: webpack.getFunctionBySource(
    mod,
    /location:"\w+"}\).+?trackExposure\({location/,
  ),
  useGuildEligibleForSummaries: webpack.getFunctionBySource(mod, /trackExposure\({guildId.+?}\)\)/),
} as ChannelSummariesExperimentMod;
