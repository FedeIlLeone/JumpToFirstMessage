import type React from "react";

interface DoubleDownArrowProps extends React.ComponentPropsWithoutRef<"svg"> {}

export default (props: DoubleDownArrowProps): React.ReactElement => {
  const { color = "currentColor", height = 24, width = 24, ...svgProps } = props;

  return (
    <svg
      aria-hidden
      role="img"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.825 10L10 13.8167L6.175 10L5 11.175L10 16.175L15 11.175L13.825 10Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.825 5L10 8.81667L6.175 5L5 6.175L10 11.175L15 6.175L13.825 5Z"
        fill={color}
      />
    </svg>
  );
};
