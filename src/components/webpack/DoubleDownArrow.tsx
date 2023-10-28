import type React from "react";
import { webpack } from "replugged";

interface DoubleDownArrowProps extends React.ComponentPropsWithoutRef<"svg"> {}

export type DoubleDownArrowType = React.FC<DoubleDownArrowProps>;

export default await webpack.waitForModule<DoubleDownArrowType>(
  webpack.filters.bySource("81667L6"),
);
