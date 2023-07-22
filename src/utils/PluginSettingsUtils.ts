import { settings } from "replugged";

interface Settings {
  align: string;
  forumsOnly: boolean;
}

const defaultSettings = {
  align: "right",
  forumsOnly: true,
} satisfies Partial<Settings>;

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.JumpToFirstMessage",
  defaultSettings,
);
