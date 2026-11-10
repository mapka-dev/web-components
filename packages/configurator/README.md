# Mapka configurator

Mapka configurator package

```bash
yarn add @mapka/configurator maplibre-gl
```

## Worker setup

maplibre-gl v6 ships as ES modules and cannot locate its worker inside a bundle.
Call `setWorkerUrl` once in your app entry, before the first map renders. With Vite:

```ts
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);
```
