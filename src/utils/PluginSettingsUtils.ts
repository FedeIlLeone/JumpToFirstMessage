import { settings } from "replugged";

interface Settings {
  align: string;
  forumsOnly: boolean;
  jumpToUnread: boolean;
}

const defaultSettings = {
  align: "right",
  forumsOnly: true,
  jumpToUnread: false,
} satisfies Partial<Settings>;

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.JumpToFirstMessage",
  defaultSettings,
);
