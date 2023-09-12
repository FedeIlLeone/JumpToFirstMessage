import { cfg } from "@utils/PluginSettingsUtils";
import type React from "react";
import { common, components, util } from "replugged";

const { i18n } = common;
const { SelectItem, SwitchItem } = components;

export default (): React.ReactElement => {
  const forumsOnly = util.useSetting(cfg, "forumsOnly");
  const jumpToUnread = util.useSetting(cfg, "jumpToUnread");
  const align = util.useSetting(cfg, "align");

  return (
    <>
      <SwitchItem {...forumsOnly} note={i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_FORUMS_ONLY_NOTE}>
        {i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_FORUMS_ONLY_TITLE}
      </SwitchItem>
      <SwitchItem
        {...jumpToUnread}
        note={i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_JUMP_TO_UNREAD_NOTE}>
        {i18n.Messages.JUMP_TO_LAST_UNREAD_MESSAGE}
      </SwitchItem>
      <SelectItem
        {...align}
        note={i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_NOTE}
        options={[
          { label: i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_LEFT, value: "left" },
          { label: i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_CENTER, value: "center" },
          { label: i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_RIGHT, value: "right" },
        ]}>
        {i18n.Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_TITLE}
      </SelectItem>
    </>
  );
};
