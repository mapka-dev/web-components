import * as maplibre from "maplibre-gl";
import { isEqual } from "es-toolkit";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { MapLibreContainer } from "./MapLibreContainer.js";
import { isEmpty } from "es-toolkit/compat";
import { MapLibreStyles } from "./MapLibreStyles.js";
import type { RequestTransformFunction, MapOptions, StyleSpecification } from "maplibre-gl";

const noopTransformRequest: RequestTransformFunction = (url) => {
  return {
    url,
  };
};

const createTransformRequest =
  (apiKey?: string, transformRequest?: RequestTransformFunction | null): RequestTransformFunction =>
  (url) => {
    if ((!isEmpty(apiKey) && url.includes("mapka.dev")) || url.includes("mapka.localhost")) {
      return {
        url,
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      };
    }
    return transformRequest ? transformRequest(url) : noopTransformRequest(url);
  };

interface MapLibreMapProps<
  Map extends maplibre.Map = maplibre.Map,
  O extends MapOptions = MapOptions,
> {
  center?: [number, number];
  zoom?: number;
  style?: string | StyleSpecification;
  width?: string | number;
  height?: string | number;
  apiKey?: string;
  injectMaplibreStyles?: boolean;
  transformRequest?: RequestTransformFunction;
  BaseMap?: new (options: O) => Map;
  onMapLoaded?: (map: Map) => void;
}

export function MapLibreMap<
  M extends maplibre.Map = maplibre.Map,
  O extends MapOptions = MapOptions,
>(props: MapLibreMapProps<M, O>) {
  const {
    BaseMap,
    width = "100%",
    height = "100%",
    center,
    zoom,
    style,
    transformRequest,
    onMapLoaded,
    apiKey,
    injectMaplibreStyles,
  } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<M | null>(null);

  /*
   * We want to this callback ref to be created only once. Deps update will be handled in dedicated useEffect
   * biome-ignore lint/correctness/useExhaustiveDependencies: ref callback is created only once
   */
  const initMap = useCallback(
    (element: HTMLDivElement) => {
      if (!map.current && element) {
        const mapOption: MapOptions & Record<string, unknown> = {
          container: element,
          style,
          center,
          zoom,
          transformRequest: createTransformRequest(apiKey, transformRequest),
        };

        if (BaseMap) {
          mapOption.apiKey = apiKey;
        }

        const mapInstance = BaseMap
          ? (new BaseMap(mapOption as O) as M)
          : (new maplibre.Map(mapOption) as M);

        container.current = element;
        map.current = mapInstance;

        if (onMapLoaded) {
          mapInstance.once("load", () => {
            onMapLoaded(mapInstance);
          });
        }
      }
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    },
    [apiKey],
  );

  const currentMap = map.current;

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
    currentMap.setStyle(style ?? null);
  }, [currentMap, style]);

  const styles = useMemo(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);

  if (!injectMaplibreStyles) {
    return <MapLibreContainer ref={initMap} style={styles} />;
  } else {
    return (
      <>
        <MapLibreStyles />
        <MapLibreContainer ref={initMap} style={styles} />
      </>
    );
  }
}

MapLibreMap.displayName = "MapLibreMap";
