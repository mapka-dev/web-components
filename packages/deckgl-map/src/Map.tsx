import "mapbox-gl/dist/mapbox-gl.css";

import { Map as Mapbox } from "mapbox-gl";
import { useCallback, useMemo, useRef } from "react";

interface MapboxMapProps {
  width?: string | number;
  height?: string | number;
  accessToken: string;
  zoom?: number;
}

export function MapboxMap(props: MapboxMapProps) {
  const { width, height, accessToken} = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<Mapbox | null>(null);

  const initMap = useCallback((newContainer: HTMLDivElement) => {
    if(!map.current) {
      const mapboxMap = new Mapbox({
        container: newContainer,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 1,
        accessToken,
      });
      map.current = mapboxMap;
      container.current = newContainer;
    }
  }, [accessToken]);

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
