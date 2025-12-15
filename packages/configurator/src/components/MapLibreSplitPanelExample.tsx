import {
  type Map as MapLibreInstance,
  MapLibreMap,
  type StyleSpecification,
} from "@mapka/react-maplibre-map";
import { SplitPanel } from "@mapka/split-panel";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor.js";

export interface MapExample {
  code?: string;
}

export interface MapLibreSplitPanelExampleProps {
  example?: MapExample;
  style?: string | StyleSpecification;
  mapkaApiKey?: string;
}

export const MapLibreSplitPanelExample: FC<MapLibreSplitPanelExampleProps> = (props) => {
  const { style, mapkaApiKey, example: { code } = {} } = props;

  const [map, setMap] = useState<MapLibreInstance | null>(null);
  const context = useMemo(() => {
    if (!map) return;
    return {
      map,
    };
  }, [map]);

  return (
    <SplitPanel
      leftPanel={<MapLibreMap style={style} apiKey={mapkaApiKey} onMapLoaded={setMap} />}
      rightPanel={<CodeEditor context={context} value={code} waitForContext />}
    />
  );
};
