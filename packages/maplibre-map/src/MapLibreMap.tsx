import { Map as MapLibre } from "maplibre-gl";
import { useCallback, useMemo, useRef } from "react";
import { MapLibreContainer } from "./MapLibreContainer.js";
import { MapLibreStyles } from "./MapLibreStyles.js";

interface MapLibreMapProps {
  width?: string | number;
  height?: string | number;
  onMapLoaded?: (map: MapLibre) => void;
}

export function MapLibreMap(props: MapLibreMapProps) {
  const { width = "100%", height = "100%", onMapLoaded } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapLibre | null>(null);

  const initMap = useCallback(
    (element: HTMLDivElement) => {
      if (!map.current) {
        const mapLibreMap = new MapLibre({
          container: element,
          style: "https://demotiles.maplibre.org/style.json",
          center: [0, 0],
          zoom: 1,
        });
        map.current = mapLibreMap;
        container.current = element;

        mapLibreMap.on("load", () => {
          if (onMapLoaded) {
            onMapLoaded(mapLibreMap);
          }
        });
      }
    },
    [onMapLoaded],
  );

  const style = useMemo(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);

  return (
    <>
      <MapLibreStyles />
      <MapLibreContainer ref={initMap} style={style} />
    </>
  );
}
