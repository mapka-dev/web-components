import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { LeafletMap, type LeafletMapInstance } from "@mapka/leaflet-map";
import type { MapExample } from "./SplitPanelExample";

export interface LeafletSplitPanelExampleProps {
  example?: MapExample;
}

export const LeafletSplitPanelExample: FC<LeafletSplitPanelExampleProps> = (props) => {
  const {
    example: { code } = {},
  } = props;

  const [map, setMapLibre] = useState<LeafletMapInstance | null>(null);
  const context = useMemo(() => {
    if (!map) return;
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
        <CodeEditor context={context} waitForContext />
      </div>
    </split-panel>
  );
};
