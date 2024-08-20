import { type MapLibre, MapLibreMap } from "@mapka/maplibre-map";
import { useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";

export const MapLibreSplitPanelExample = () => {
  const [mapLibre, setMapLibre] = useState<MapLibre | null>(null);
  const contextMapLibre = useMemo(() => {
    return {
      map: mapLibre,
    };
  }, [mapLibre]);

  return (
    <split-panel>
      <div slot="map-panel">
        <MapLibreMap onMapLoaded={setMapLibre} />
      </div>

      <div slot="content-panel">
        <CodeEditor context={contextMapLibre} />
      </div>
    </split-panel>
  );
};
