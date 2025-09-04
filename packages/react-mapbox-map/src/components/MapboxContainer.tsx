import { type CSSProperties, forwardRef } from "react";

const containerId = "mapka-mapbox-container";

export const MapboxContainer = forwardRef<HTMLDivElement, { style: CSSProperties }>(
  (props, ref) => {
    return <div id={containerId} ref={ref} {...props} />;
  },
);
