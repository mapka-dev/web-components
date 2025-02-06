import { type CSSProperties, forwardRef } from "react";

export const MapLibreContainer = forwardRef<HTMLDivElement, { style: CSSProperties }>(
  (props, ref) => {
    return <div id="mapka-maplibre-container" ref={ref} {...props} />;
  },
);
