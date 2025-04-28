import { type MapLibreInstance, MapLibreMap } from "@mapka/maplibre-map";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";

export interface MapLibreSplitPanelExampleProps {
  example?: MapExample;
}

export const MapLibreSplitPanelExample: FC<MapLibreSplitPanelExampleProps> = (props) => {
  const {
    example: { code } = {},
  } = props;

  const [map, setMap] = useState<MapLibreInstance | null>(null);
  const context = useMemo(() => {
    if (!map) return;
    return {
      map,
    };
  }, [map]);

  return (
    <split-panel>
      <div slot="map-panel">
        <MapLibreMap onMapLoaded={setMap} />
      </div>

      <div slot="content-panel">
        <CodeEditor context={context} defaultValue={code} waitForContext />
      </div>
    </split-panel>
  );
};
