import { type MapLibreInstance, MapLibreMap } from "@mapka/maplibre-map";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";
import { SplitPanel } from "@mapka/split-panel";

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
    <SplitPanel
      leftPanel={<MapLibreMap onMapLoaded={setMap} showFeatureTooltip />}
      rightPanel={<CodeEditor context={context} defaultValue={code} waitForContext />}
    />
  );
};
