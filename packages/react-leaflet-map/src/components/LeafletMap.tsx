import type L from "leaflet";
import type { Map as LeafletMapInstance } from "leaflet";
import { debounce } from "es-toolkit";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { LeafletContainer } from "./LeafletContainer.js";
import { LeafletStyles } from "./LeafletStyles.js";

type LeafletType = typeof L;

interface LeafletMapProps {
  width?: string | number;
  height?: string | number;
  onMapLoaded?: (map: LeafletMapInstance, L: LeafletType) => void;
}

export function LeafletMap(props: LeafletMapProps) {
  const { width = "100%", height = "100%", onMapLoaded } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<LeafletMapInstance | null>(null);

  /*
   * We want to this callback ref to be created only once. Deps update will be handled in dedicated useEffect
   * biome-ignore lint/correctness/useExhaustiveDependencies: ref callback is created only once
   */
  const initMap = useCallback((element: HTMLDivElement) => {
    if (!map.current) {
      import("leaflet").then(({ default: L }) => {
        if (!element) {
          return;
        }
        if (!map.current) {
          const leafletMap = L.map(element, {
            center: [0, 0],
            zoom: 1,
            layers: [
              L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution:
                  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
              }),
            ],
          });
          map.current = leafletMap;
          container.current = element;
          if (onMapLoaded) {
            leafletMap.whenReady(() => {
              onMapLoaded(leafletMap, L);
            });
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!container.current) return;

    const resizer = new ResizeObserver(debounce(() => map.current?.invalidateSize(), 150));
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
      <LeafletStyles />
      <LeafletContainer style={style} ref={initMap} />
    </>
  );
}
