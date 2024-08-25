import { type Leaflet, LeafletMap, type LeafletMapInstance } from "@mapka/leaflet-map";
import { type FC, useState } from "react";
import { CodeEditor } from "./CodeEditor";
import type { MapExample } from "./SplitPanelExample";
import { SplitPanel } from "@mapka/split-panel";

export interface LeafletSplitPanelExampleProps {
  example?: MapExample;
}

export const LeafletSplitPanelExample: FC<LeafletSplitPanelExampleProps> = (props) => {
  const {
    example: { code } = {},
  } = props;

  const [context, setContext] = useState<{ map: LeafletMapInstance; L: Leaflet }>();

  return (
    <SplitPanel
      leftPanel={<LeafletMap onMapLoaded={(map, L) => setContext({ map, L })} />}
      rightPanel={<CodeEditor context={context} defaultValue={code} waitForContext />}
    />
  );
};
