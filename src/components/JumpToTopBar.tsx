import DoubleDownArrow from "@components/DoubleDownArrow";
import ChannelSummariesExperiment from "@experiments/ChannelSummaries";
import type { MessagesProps } from "@types";
import { cfg } from "@utils/PluginSettingsUtils";
import classNames from "classnames";
import { common, components, webpack } from "replugged";

import "./JumpToTopBar.css";

const {
  i18n: { Messages },
  React,
  messages,
} = common;
const { Clickable, Loader: Spinner } = components;

type JumpToTopBarProps = Pick<MessagesProps, "channel" | "messages" | "unreadCount">;

const classes = await webpack.waitForProps<Record<"button" | "jumpSpinner" | "navigator", string>>(
  "jumpSpinner",
  "navigator",
);

export default (props: JumpToTopBarProps): React.ReactElement | null => {
  const { channel, messages: channelMessages, unreadCount } = props;
  const { jumpTargetId, loadingMore } = channelMessages;

  const firstMessageCached = channelMessages.first();

  // Check if the first message cached is the first message in a forum post
  // if not, we need to add an extra margin to the top of the container
  const firstMessageInPost: boolean =
    channelMessages.length > 0 && firstMessageCached
      ? // @ts-expect-error discord-types is terribly outdated
        firstMessageCached.isFirstMessageInForumPost(channel)
      : false;
  // @ts-expect-error discord-types is terribly outdated x2
  const hasNoticeAbove: boolean = channel.isForumPost() && !firstMessageInPost;

  // Check if the channel can have "channel summaries" and add an extra margin
  const hasTopicsBarAbove = ChannelSummariesExperiment?.canSeeChannelSummaries?.(channel);

  const jumpTargetIsFirstMessage = jumpTargetId === channel.id;
  const canShow = hasNoticeAbove || channelMessages.hasMoreBefore;

  const align = cfg.get("align");

  const handleClick = React.useCallback(() => {
    void messages.jumpToMessage({
      channelId: channel.id,
      messageId: channel.id,
    });
  }, [channel.id]);

  return channelMessages.hasFetched && canShow ? (
    <div
      className={classNames(
        "jumpToFirstMessage-container",
        { containerMarginTop: hasNoticeAbove || hasTopicsBarAbove || unreadCount > 0 },
        { containerMarginTopExtra: hasNoticeAbove && hasTopicsBarAbove },
        { [align]: align },
      )}
      style={{
        visibility: canShow ? "inherit" : "hidden",
      }}>
      <Clickable
        aria-label={Messages.JUMPTOFIRSTMESSAGE_JUMP_BUTTON_A11Y_LABEL}
        className={classes.navigator}
        onClick={handleClick}>
        <div className={classes.button}>
          {loadingMore && jumpTargetIsFirstMessage ? (
            <Spinner type={Spinner.Type.SPINNING_CIRCLE} className={classes.jumpSpinner} />
          ) : (
            <DoubleDownArrow className="jumpToFirstMessage-icon" />
          )}
        </div>
      </Clickable>
    </div>
  ) : null;
};
