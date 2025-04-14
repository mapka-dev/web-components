import type mapbox from "mapbox-gl";
import { debounce, isEqual } from "es-toolkit";
import { type FC, memo, useCallback, useEffect, useMemo, useRef, version } from "react";
import { MapboxContainer } from "./MapboxContainer.js";
import { MapboxStyles } from "./MapboxStyles.js";
import type { StyleSpecification } from "mapbox-gl";

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  style?: string | StyleSpecification;
  width?: string | number;
  height?: string | number;
  accessToken: string;
  mapkaApiKey?: string;
  showFeatureTooltip?: boolean;
  onMapLoaded?: (map: mapbox.Map) => void;
}

const defaultStyle = "mapbox://styles/mapbox/streets-v12";

export const MapboxMap: FC<MapboxMapProps> = memo((props) => {
  const {
    width = "100%",
    height = "100%",
    center,
    zoom,
    style = defaultStyle,
    accessToken,
    mapkaApiKey,
    showFeatureTooltip,
    onMapLoaded,
  } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapbox.Map | null>(null);

  const mapkaAPIkeyRef = useRef<string | null>(mapkaApiKey);
  if (mapkaApiKey !== mapkaAPIkeyRef.current) {
    mapkaAPIkeyRef.current = mapkaApiKey;
  }

  /*
   * We want to this callback ref to be created only once. Deps update will be handled in dedicated useEffect
   * biome-ignore lint/correctness/useExhaustiveDependencies: ref callback is created only once
   */
  const initMap = useCallback(
    (element: HTMLDivElement): VoidFunction | undefined => {
      if (!map.current && element) {
        import("mapbox-gl").then(({ default: mapbox }) => {
          const mapboxMap = new mapbox.Map({
            container: element,
            style,
            center,
            zoom,
            accessToken,
            fitBoundsOptions: {
              padding: 15,
            },
            transformRequest: (url) => {
              if (url.includes("mapka.dev") || url.includes("mapka.localhost")) {
                if (mapkaAPIkeyRef.current) {
                  return {
                    url,
                    headers: {
                      Authorization: `Bearer ${mapkaAPIkeyRef.current}`,
                    },
                  };
                }
              }
              return {
                url,
              };
            },
          });
          map.current = mapboxMap;
          container.current = element;

          if (onMapLoaded) {
            mapboxMap.once("load", () => {
              onMapLoaded(mapboxMap);
            });
          }
        });
      }
      if (!version?.startsWith("19")) {
        return;
      }
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    },
    [accessToken],
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

  useEffect(() => {
    if (!currentMap) return;
    if (!Number.isInteger(zoom)) return;

    const currentZoom = currentMap.getZoom();

    if (!isEqual(currentZoom, zoom)) {
      currentMap.setZoom(zoom as number);
    }
  }, [currentMap, zoom]);

  useEffect(() => {
    if (!currentMap) return;
    if (!Array.isArray(center)) return;

    const currentCenter = currentMap.getCenter().toArray();
    if (!isEqual(currentCenter, center)) {
      currentMap.setCenter(center);
    }
  }, [currentMap, center]);

  useEffect(() => {
    if (!currentMap) return;
    currentMap.setStyle(style);
  }, [currentMap, style]);

  const styles = useMemo(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);

  return (
    <>
      <MapboxStyles />
      <MapboxContainer style={styles} ref={initMap} />
    </>
  );
});

MapboxMap.displayName = "MapboxMap";
