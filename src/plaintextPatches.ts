import type { types } from "replugged";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.JumpToFirstMessage")`;

const patches: types.PlaintextPatch[] = [
  {
    find: "navigationDescription",
    replacements: [
      {
        match: /(group-spacing.+?children:\[)/,
        replace: (_, prefix) => `${prefix}${pluginExports}._renderJumpToTopBar(arguments[0]),`,
      },
    ],
  },
];

export default patches;
