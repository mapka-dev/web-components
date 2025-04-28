import L from "leaflet";
import { useCallback, useMemo, useRef } from "react";

interface LeafletMapProps {
  width?: string | number;
  height?: string | number;
}

export function LeafletMap(props: LeafletMapProps) {
  const { width = "100%", height = "100%"} = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map | null>(null);

  const initMap = useCallback((newContainer: HTMLDivElement) => {
    if(!map.current) {
      const leafletMap = L.map(newContainer,
        {
          center: [0, 0],
          zoom: 1,
        }
      );
      map.current = leafletMap;
      container.current = newContainer;
    }
  }, []);


  const style = useMemo(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);


  return (
    <div 
      style={style} 
      ref={initMap}
    />
  );
}
