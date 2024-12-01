import { MapboxMap, type MapboxMapInstance } from "@mapka/mapbox-map";
import { SplitPanel } from "@mapka/split-panel";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";


export interface MapboxSplitPanelExampleProps {
  example?: MapExample;
  mapboxAccessToken: string; 
}

export const MapboxSplitPanelExample: FC<MapboxSplitPanelExampleProps> = (props) => {
  const {
    mapboxAccessToken,
    example: { code } = {},
  } = props;

  const [map, setMap] = useState<MapboxMapInstance | null>(null);
  const context = useMemo(() => {
    if (!map) return;
    return {
      map,
    };
  }, [map]);

  return (
    <SplitPanel
      leftPanel={<MapboxMap accessToken={mapboxAccessToken} onMapLoaded={setMap} />}
      rightPanel={<CodeEditor context={context} defaultValue={code} waitForContext />}
    />
  );
};
