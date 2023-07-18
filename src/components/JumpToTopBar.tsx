import type { MessagesProps } from "@types";
import classNames from "classnames";
import { common, components, webpack } from "replugged";
import ForumPostMessagesStore from "../stores/ForumPostMessagesStore";
import { useStateFromStores } from "../utils/FluxUtils";
import DoubleDownArrow from "./DoubleDownArrow";

import "./JumpToTopBar.css";

const { React, messages } = common;
const { Clickable, Loader } = components;

type JumpToTopBarProps = Pick<MessagesProps, "channel" | "messages">;

export type JumpToTopBarType = React.FC<JumpToTopBarProps>;

const classes = await webpack.waitForProps<Record<"button" | "jumpSpinner" | "navigator", string>>(
  "jumpSpinner",
  "navigator",
);

export default ((props) => {
  const { channel, messages: channelMessages } = props;
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

  const state = useStateFromStores(
    [ForumPostMessagesStore],
    () => {
      return ForumPostMessagesStore.getMessage(channel.id);
    },
    [channel.id],
  );

  const handleClick = React.useCallback(() => {
    if (!state.firstMessage) return;

    messages.jumpToMessage({
      channelId: channel.id,
      messageId: state.firstMessage.id,
    });
  }, [state.firstMessage, channel.id]);

  const jumpTargetIsFirstMessage = jumpTargetId === state.firstMessage?.id;

  // Kinda a hacky solution, if the notice is visible then we are sure the first message has been unloaded
  return channelMessages.hasFetched && (hasNoticeAbove || channelMessages.hasMoreBefore) ? (
    <div
      className={classNames("jumpToFirstMessage-container", { containerMarginTop: hasNoticeAbove })}
      style={{
        visibility: !hasNoticeAbove ? "hidden" : "inherit",
      }}>
      <Clickable aria-label="Jump to Top" className={classes.navigator} onClick={handleClick}>
        <div className={classes.button}>
          {loadingMore && jumpTargetIsFirstMessage ? (
            <Loader type={Loader.Type.SPINNING_CIRCLE} className={classes.jumpSpinner} />
          ) : (
            <DoubleDownArrow className="jumpToFirstMessage-icon" />
          )}
        </div>
      </Clickable>
    </div>
  ) : null;
}) as JumpToTopBarType;
