import { type MapboxMapInstance, MapboxMap } from "@mapka/mapbox-map";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";

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
    <split-panel>
      <div slot="map-panel">
        <MapboxMap onMapLoaded={setMap} accessToken={accessToken} />
      </div>

      <div slot="content-panel">
        <CodeEditor 
          context={context} 
          defaultValue={code} 
          waitForContext 
        />
      </div>
    </split-panel>
  );
};
