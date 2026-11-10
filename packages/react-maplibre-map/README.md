# React Mapka MapLibre map components

```bash
yarn add @mapka/react-maplibre-map maplibre-gl

```

## Usage

```tsx
import { MapLibreMap } from "@mapka/react-maplibre-map";

<MapLibreMap onMapLoaded={(map) => console.log(map)} />
```

## Worker setup

maplibre-gl v6 ships as ES modules and cannot locate its worker inside a bundle.
Call `setWorkerUrl` once in your app entry, before the first map renders. With Vite:

```ts
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);
```
