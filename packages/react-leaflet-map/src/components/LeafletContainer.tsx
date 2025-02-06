import { type CSSProperties, forwardRef } from "react";

export const LeafletContainer = forwardRef<HTMLDivElement, { style: CSSProperties }>(
  (props, ref) => {
    return <div id="mapka-leaflet-container" ref={ref} {...props} />;
  },
);
