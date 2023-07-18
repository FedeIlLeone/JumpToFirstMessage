import { webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

type useStateFromStores = <T>(
  stores: Store[],
  callback: () => T,
  deps?: React.DependencyList,
  compare?: (a: T, b: T) => boolean,
) => T;

type statesWillNeverBeEqual = <T>(a: T, b: T) => boolean;

type useStateFromStoresArray = <T>(
  stores: Store[],
  callback: () => T,
  deps?: React.DependencyList,
) => T;

type useStateFromStoresObject = <T>(
  stores: Store[],
  callback: () => T,
  deps?: React.DependencyList,
) => T;

// These are not "utils", but I'll put them here for now until are with replugged flux common module
const fluxHooksMod = await webpack.waitForModule(webpack.filters.bySource("useStateFromStores"));

export const useStateFromStores = webpack.getFunctionBySource<useStateFromStores>(
  fluxHooksMod,
  "useStateFromStores",
)!;
export const statesWillNeverBeEqual = webpack.getFunctionBySource<statesWillNeverBeEqual>(
  fluxHooksMod,
  "return!1",
)!;
export const useStateFromStoresArray = webpack.getFunctionBySource<useStateFromStoresArray>(
  fluxHooksMod,
  /return .\(.{0,9}\)/,
)!;
export const useStateFromStoresObject = webpack.getFunctionBySource<useStateFromStoresObject>(
  fluxHooksMod,
  /return .\(.{0,7}\)/,
)!;
