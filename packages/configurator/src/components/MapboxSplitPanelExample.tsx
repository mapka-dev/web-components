import { MapboxMap, type MapboxMapInstance } from "@mapka/mapbox-map";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";
import { SplitPanel } from "@mapka/split-panel";

const accessToken =
  "pk.eyJ1IjoibWFyY2lua29wYWN6IiwiYSI6ImNrenlteHJvaTAxdWUzY254ZHppMG5nN3QifQ.U3tuBCRNFosiS3buKpUxnQ";

export interface MapboxSplitPanelExampleProps {
  example?: MapExample;
}

export const MapboxSplitPanelExample: FC<MapboxSplitPanelExampleProps> = (props) => {
  const {
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
      leftPanel={<MapboxMap accessToken={accessToken} onMapLoaded={setMap} />}
      rightPanel={<CodeEditor context={context} defaultValue={code} waitForContext />}
    />
  );
};
