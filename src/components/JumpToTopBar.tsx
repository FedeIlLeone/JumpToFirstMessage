import type { MessagesProps } from "@types";
import classNames from "classnames";
import { common, components, webpack } from "replugged";
import DoubleDownArrow from "./DoubleDownArrow";
import { cfg } from "../utils/PluginSettingsUtils";

import "./JumpToTopBar.css";

const { React, messages } = common;
const { Clickable, Loader: Spinner } = components;

type JumpToTopBarProps = Pick<MessagesProps, "channel" | "messages" | "unreadCount">;

export type JumpToTopBarType = React.FC<JumpToTopBarProps>;

const classes = await webpack.waitForProps<Record<"button" | "jumpSpinner" | "navigator", string>>(
  "jumpSpinner",
  "navigator",
);

export default ((props) => {
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

  const handleClick = React.useCallback(() => {
    messages.jumpToMessage({
      channelId: channel.id,
      messageId: channel.id,
    });
  }, [channel.id]);

  const jumpTargetIsFirstMessage = jumpTargetId === channel.id;
  const canShow = hasNoticeAbove || channelMessages.hasMoreBefore;

  const align = cfg.get("align");

  return channelMessages.hasFetched && canShow ? (
    <div
      className={classNames(
        "jumpToFirstMessage-container",
        { containerMarginTop: hasNoticeAbove || unreadCount > 0 },
        { [align]: align },
      )}
      style={{
        visibility: canShow ? "inherit" : "hidden",
      }}>
      <Clickable aria-label="Jump to Top" className={classes.navigator} onClick={handleClick}>
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
}) as JumpToTopBarType;
