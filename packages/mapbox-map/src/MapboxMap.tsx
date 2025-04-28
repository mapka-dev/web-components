import { Map as Mapbox } from "mapbox-gl";
import { debounce } from "moderndash";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { MapboxContainer } from "./MapboxContainer.js";
import { MapboxStyles } from "./MapboxStyles.js";

interface MapboxMapProps {
  width?: string | number;
  height?: string | number;
  accessToken: string;
  zoom?: number;
  onMapLoaded?: (map: Mapbox) => void;
}

export function MapboxMap(props: MapboxMapProps) {
  const { width = "100%", height = "100%", accessToken, onMapLoaded } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<Mapbox | null>(null);

  const initMap = useCallback(
    (element: HTMLDivElement) => {
      if (!map.current) {
        const mapboxMap = new Mapbox({
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
        container.current = element;

        mapboxMap.once("load", () => {
          onMapLoaded?.(mapboxMap);
        });
      }
    },
    [accessToken, onMapLoaded],
  );

  useEffect(() => {
    if (map.current === null) {
      return;
    }
    if (container.current === null) {
      return;
    }

    const resizer = new ResizeObserver(debounce(() => map.current?.resize(), 150));
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
