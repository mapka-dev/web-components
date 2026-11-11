# Mapka configurator

Mapka configurator package

```bash
yarn add @mapka/configurator maplibre-gl @mantine/core @mantine/hooks
```

The components render inside your app's `MantineProvider`, so `@mantine/core` and `@mantine/hooks`
are peer dependencies. Import `@mantine/core/styles.css` once in your app entry.

## Worker setup

maplibre-gl v6 ships as ES modules and cannot locate its worker inside a bundle.
Call `setWorkerUrl` once in your app entry, before the first map renders. With Vite:

```ts
import { setWorkerUrl } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

setWorkerUrl(workerUrl);
```
