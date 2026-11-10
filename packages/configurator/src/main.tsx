import "./main.css";

import "@mantine/core/styles.css";
import "@mapka/split-panel/webcomponent";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";

import { MantineProvider } from "@mantine/core";
import { setWorkerUrl } from "maplibre-gl";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js";

setWorkerUrl(workerUrl);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
);
