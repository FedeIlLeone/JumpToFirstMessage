import { types } from "replugged";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.JumpToFirstMessage")`;

const patches: types.PlaintextPatch[] = [
  {
    find: /\(\)\.messagesWrapper,/,
    replacements: [
      {
        match: /(group-spacing.+?children:\[)/,
        replace: (_, prefix) => `${prefix}${pluginExports}._renderJumpToTopBar(e),`,
      },
    ],
  },
];

export default patches;
