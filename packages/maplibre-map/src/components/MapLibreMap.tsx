import type maplibre from "maplibre-gl";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { MapLibreContainer } from "./MapLibreContainer.js";
import { MapLibreStyles } from "./MapLibreStyles.js";

interface MapLibreMapProps {
  width?: string | number;
  height?: string | number;
  showFeatureTooltip?: boolean;
  onMapLoaded?: (map: maplibre.Map) => void;
}

export function MapLibreMap(props: MapLibreMapProps) {
  const { width = "100%", height = "100%", onMapLoaded, showFeatureTooltip } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibre.Map | null>(null);

  const initMap = useCallback(
    (element: HTMLDivElement) => {
      container.current = element;

      import("maplibre-gl").then(({ default: maplibre }) => {
        if (!map.current) {
          const mapLibreMap = new maplibre.Map({
            container: element,
            style: "https://demotiles.maplibre.org/style.json",
            center: [0, 0],
            zoom: 1,
          });
          map.current = mapLibreMap;

          if (onMapLoaded) {
            mapLibreMap.once("load", () => {
              onMapLoaded(mapLibreMap);
            });
          }
        }
      });
    },
    [onMapLoaded],
  );

  const currentMap = map.current;
  useEffect(() => {
    if (!showFeatureTooltip) return;

    const onClick = (event: maplibre.MapMouseEvent) => {
      const features = currentMap?.queryRenderedFeatures(event.point);
      if (!features) return;
      console.log(features);
    };
    currentMap?.on("click", onClick);

    return () => {
      currentMap?.off("click", onClick);
    };
  }, [currentMap, showFeatureTooltip]);

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
