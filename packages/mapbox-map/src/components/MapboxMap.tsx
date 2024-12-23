import type mapbox from "mapbox-gl";
import { debounce } from "es-toolkit";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { MapboxContainer } from "./MapboxContainer.js";
import { MapboxStyles } from "./MapboxStyles.js";

interface MapboxMapProps {
  width?: string | number;
  height?: string | number;
  accessToken: string;
  showFeatureTooltip?: boolean;
  onMapLoaded?: (map: mapbox.Map) => void;
}

export function MapboxMap(props: MapboxMapProps) {
  const { width = "100%", height = "100%", accessToken, showFeatureTooltip, onMapLoaded } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapbox.Map | null>(null);

  const initMap = useCallback(
    (element: HTMLDivElement) => {
      if (!map.current) {
        container.current = element;

        import("mapbox-gl").then(({ default: mapbox }) => {
          if (!element) {
            return;
          }

          if (!map.current) {
            const mapboxMap = new mapbox.Map({
              container: element,
              style: "mapbox://styles/mapbox/streets-v12",
              center: [0, 0],
              zoom: 1,
              accessToken,
              fitBoundsOptions: {
                padding: 15,
              },
            });
            map.current = mapboxMap;

            if (onMapLoaded) {
              mapboxMap.once("load", () => {
                onMapLoaded(mapboxMap);
              });
            }
          }
        });
      }
    },
    [accessToken, onMapLoaded],
  );

  const currentMap = map.current;
  useEffect(() => {
    if (!showFeatureTooltip) return;

    const onClick = (event: mapbox.MapMouseEvent) => {
      const features = currentMap?.queryRenderedFeatures(event.point);
      if (!features) return;

      console.log(features);
    };
    currentMap?.on("click", onClick);

    return () => {
      currentMap?.off("click", onClick);
    };
  }, [currentMap, showFeatureTooltip]);

  useEffect(() => {
    if (container.current === null) return;

    const resizer = new ResizeObserver(
      debounce(() => {
        map.current?.resize();
      }, 150),
    );
    resizer.observe(container.current);

    return () => {
      resizer.disconnect();
    };
  }, []);

  const style = useMemo(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);

  return (
    <>
      <MapboxStyles />
      <MapboxContainer style={style} ref={initMap} />
    </>
  );
}
