import { type Leaflet, LeafletMap, type LeafletMapInstance } from "@mapka/leaflet-map";
import { type FC, useMemo, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";

export interface LeafletSplitPanelExampleProps {
  example?: MapExample;
}

export const LeafletSplitPanelExample: FC<LeafletSplitPanelExampleProps> = (props) => {
  const {
    example: { code } = {},
  } = props;

  const [context, setContext] = useState<{ map: LeafletMapInstance; L: Leaflet }>();

  return (
    <split-panel>
      <div slot="map-panel">
        <LeafletMap onMapLoaded={(map, L) => setContext({ map, L })} />
      </div>

      <div slot="content-panel">
        <CodeEditor context={context} defaultValue={code} waitForContext />
      </div>
    </split-panel>
  );
};
