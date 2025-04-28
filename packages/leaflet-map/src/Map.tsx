import L from "leaflet";
import { debounce } from "moderndash";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { LeafletStyles } from "./LeafletStyles.js";

interface LeafletMapProps {
  width?: string | number;
  height?: string | number;
  onMapLoaded?: (map: L.Map) => void;
}

export function LeafletMap(props: LeafletMapProps) {
  const { width = "100%", height = "100%", onMapLoaded } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map | null>(null);

  const initMap = useCallback((newContainer: HTMLDivElement) => {
    if (!map.current) {
      const leafletMap = L.map(newContainer, {
        center: [0, 0],
        zoom: 1,
        layers: [
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          }),
        ],
      });
      map.current = leafletMap;
      container.current = newContainer;
      onMapLoaded?.(leafletMap);
    }
  }, [onMapLoaded]);

  useEffect(() => {
    if (map.current === null) {
      return;
    }
    if (container.current === null) { 
      return;
    }

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
      <div style={style} ref={initMap} />
    </>
  );
}
