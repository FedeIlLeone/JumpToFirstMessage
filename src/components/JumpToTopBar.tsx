import type { Comparator, MessagesProps } from "@types";
import classNames from "classnames";
import { common, components, webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";
import ForumPostMessagesStore from "../stores/ForumPostMessagesStore";
import DoubleDownArrow from "./DoubleDownArrow";

import "./JumpToTopBar.css";

const { React, messages } = common;
const { Clickable, Loader } = components;

type useStateFromStores = <T>(
  stores: Store[],
  callback: () => T,
  deps?: React.DependencyList,
  compare?: Comparator<T>,
) => T;

// This and the other hooks have to be exported with replugged Flux common module
const useStateFromStores: useStateFromStores = await webpack
  .waitForModule(webpack.filters.bySource("useStateFromStores"))
  .then((mod) => webpack.getFunctionBySource(mod, "useStateFromStores")!);

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
  const firstMessageInPost =
    channelMessages.length > 0 && firstMessageCached
      ? // @ts-expect-error discord-types is terribly outdated
        firstMessageCached.isFirstMessageInForumPost(channel)
      : null;
  // @ts-expect-error discord-types is terribly outdated x2
  const hasNoticeAbove = channel.isForumPost() && !firstMessageInPost;

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

  // This is not that great, if there are a lot of cached messages
  // TODO: Find a better way, calculate how far the first message is
  const firstMessageCachedVisible = firstMessageCached?.id === state.firstMessage?.id;
  const jumpTargetIsFirstMessage = jumpTargetId === state.firstMessage?.id;

  return !firstMessageCachedVisible ? (
    <div
      className={classNames("jumpToFirstMessage-container", { containerMarginTop: hasNoticeAbove })}
      style={{
        visibility: firstMessageCachedVisible ? "hidden" : "inherit",
      }}>
      <Clickable aria-label="Jump To Top" className={classes.navigator} onClick={handleClick}>
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
