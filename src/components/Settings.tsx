import { cfg } from "@utils/PluginSettingsUtils";
import type React from "react";
import { common, components, util } from "replugged";

const {
  i18n: { Messages },
} = common;
const { SelectItem, SwitchItem } = components;

export default (): React.ReactElement => {
  const forumsOnly = util.useSetting(cfg, "forumsOnly");
  const align = util.useSetting(cfg, "align");

  return (
    <>
      <SwitchItem {...forumsOnly} note={Messages.JUMPTOFIRSTMESSAGE_SETTINGS_FORUMS_ONLY_NOTE}>
        {Messages.JUMPTOFIRSTMESSAGE_SETTINGS_FORUMS_ONLY_TITLE}
      </SwitchItem>
      <SelectItem
        {...align}
        note={Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_NOTE}
        options={[
          { label: Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_LEFT, value: "left" },
          { label: Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_CENTER, value: "center" },
          { label: Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_RIGHT, value: "right" },
        ]}>
        {Messages.JUMPTOFIRSTMESSAGE_SETTINGS_ALIGNMENT_TITLE}
      </SelectItem>
    </>
  );
};
