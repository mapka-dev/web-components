import { type CSSProperties, forwardRef } from "react";

const containerId = "mapka-leaflet-container";
export const LeafletContainer = forwardRef<HTMLDivElement, { style: CSSProperties }>(
  (props, ref) => {
    return <div id={containerId} ref={ref} {...props} />;
  },
);
