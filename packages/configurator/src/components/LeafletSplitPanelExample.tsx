import { useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { LeafletMap, type LeafletMapInstance } from "@mapka/leaflet-map";

export const LeafletSplitPanelExample = () => {
  const [map, setMapLibre] = useState<LeafletMapInstance | null>(null);
  const contextMapLibre = useMemo(() => {
    return {
      map,
    };
  }, [map]);

  return (
    <split-panel>
      <div slot="map-panel">
        <LeafletMap onMapLoaded={setMapLibre} />
      </div>

      <div slot="content-panel">
        <CodeEditor context={contextMapLibre} />
      </div>
    </split-panel>
  );
};
