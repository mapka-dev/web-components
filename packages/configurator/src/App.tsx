import { type Mapbox, MapboxMap } from "@mapka/mapbox-map";
import { type MapLibre, MapLibreMap } from "@mapka/maplibre-map";
import { SplitPanel } from "@mapka/split-panel";
import { CodeEditor } from "./components/CodeEditor";
import { useMemo, useState } from "react";

customElements.define("split-panel", SplitPanel);

const accessToken = "pk.eyJ1IjoibWFyY2lua29wYWN6IiwiYSI6ImNrenlteHJvaTAxdWUzY254ZHppMG5nN3QifQ.U3tuBCRNFosiS3buKpUxnQ"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "split-panel": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

function App() {
  const [mapLibre, setMapLibre] = useState<MapLibre | null>(null);
  const contextMapLibre = useMemo(() => {
    return {
      map: mapLibre,
    };
  }, [mapLibre]);

  const [mapMapbox, setMapMapbox] = useState<Mapbox | null>(null);
  const contextMapMapbox = useMemo(() => {
    return {
      map: mapMapbox,
    };
  }, [mapMapbox]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <split-panel>
        <div slot="map-panel">
          <MapLibreMap onMapLoaded={setMapLibre} />
        </div>

        <div slot="content-panel">
          <CodeEditor context={contextMapLibre} />
        </div>
      </split-panel>

      <split-panel>
        <div slot="map-panel">
          <MapboxMap 
            onMapLoaded={setMapMapbox} 
            accessToken={accessToken}
          />
        </div>

        <div slot="content-panel">
          <CodeEditor context={contextMapMapbox} />
        </div>
      </split-panel>
    </div>
  );
}

export default App;
