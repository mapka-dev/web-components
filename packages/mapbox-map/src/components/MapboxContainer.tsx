import { type CSSProperties, forwardRef } from "react";

export const MapboxContainer = forwardRef<HTMLDivElement, { style: CSSProperties }>(
  (props, ref) => {
    return <div id="mapka-mapbox-container" ref={ref} {...props} />;
  },
);
