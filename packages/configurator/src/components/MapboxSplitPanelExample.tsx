import { type MapboxMapInstance, MapboxMap } from "@mapka/mapbox-map";
import { useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";

const accessToken =
  "pk.eyJ1IjoibWFyY2lua29wYWN6IiwiYSI6ImNrenlteHJvaTAxdWUzY254ZHppMG5nN3QifQ.U3tuBCRNFosiS3buKpUxnQ";

export const MapboxSplitPanelExample = () => {
  const [mapMapbox, setMapMapbox] = useState<MapboxMapInstance | null>(null);
  const contextMapMapbox = useMemo(() => {
    return {
      map: mapMapbox,
    };
  }, [mapMapbox]);

  return (
    <split-panel>
      <div slot="map-panel">
        <MapboxMap onMapLoaded={setMapMapbox} accessToken={accessToken} />
      </div>

      <div slot="content-panel">
        <CodeEditor context={contextMapMapbox} />
      </div>
    </split-panel>
  );
};
