export { LeafletMap } from "./components/LeafletMap.js";

import type L from "leaflet";

type Leaflet = typeof L;
type LeafletMapInstance = L.Map;

export type { LeafletMapInstance, Leaflet };
