import type React from "react";
import { components, util } from "replugged";
import { cfg } from "../utils/PluginSettingsUtils";

const { SelectItem, SwitchItem } = components;

export default (): React.ReactElement => {
  const forumsOnly = util.useSetting(cfg, "forumsOnly");
  const align = util.useSetting(cfg, "align");

  return (
    <>
      <SwitchItem
        {...forumsOnly}
        note="Whether to display the button in forum posts only. It's recommended to leave this option enabled.">
        Only show in forum channels
      </SwitchItem>
      <SelectItem
        {...align}
        note="The horizontal alignment of the button in the channels."
        options={[
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ]}>
        Button Alignment
      </SelectItem>
    </>
  );
};
