import { Map as Mapbox } from "mapbox-gl";
import { useCallback, useMemo, useRef } from "react";
import { MapboxStyles } from "./MapboxStyles.js";

interface MapboxMapProps {
  width?: string | number;
  height?: string | number;
  accessToken: string;
  zoom?: number;
  onMapLoaded?: (map: Mapbox) => void;
}

export function MapboxMap(props: MapboxMapProps) {
  const { 
    width = "100%", 
    height = "100%", 
    accessToken,
    onMapLoaded,
  } = props;

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

      mapboxMap.on("load", () => {
        if (onMapLoaded) {
          onMapLoaded(mapboxMap);
        }
      });
    }
  }, [accessToken, onMapLoaded]);

  const style = useMemo(() => {
    return {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };
  }, [width, height]);


  return (
    <>
      <MapboxStyles />
      <div 
        style={style} 
        ref={initMap}
      />
    </>
  );
}
