import type { FC } from "react";
import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { LeafletSplitPanelExample } from "./LeafletSplitPanelExample.js";
import { MapLibreSplitPanelExample } from "./MapLibreSplitPanelExample.js";
import { MapboxSplitPanelExample } from "./MapboxSplitPanelExample.js";

export interface MapExample {
  code?: string;
}

interface SplitPanelExampleProps {
  mapLibreStyle?: string;
  mapLibreExample?: MapExample;
  mapboxStyle?: string;
  mapboxExample?: MapExample;
  mapboxAccessToken?: string;
  mapkaApiKey?: string;
  leafletExample?: MapExample;
  defaultValue?: "mapLibre" | "mapbox" | "leaflet";
}

export const SplitPanelExample: FC<SplitPanelExampleProps> = ({
  mapLibreStyle,
  mapLibreExample,
  mapkaApiKey,
  mapboxExample,
  mapboxStyle,
  mapboxAccessToken,
  leafletExample,
  defaultValue = "mapLibre",
}) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs
      variant="pills"
      radius="sm"
      h="100%"
      w="100%"
      keepMounted={false}
      defaultValue={defaultValue}
    >
      <Tabs.List>
        {mapLibreExample && (
          <Tabs.Tab value="mapLibre" leftSection={<IconPhoto style={iconStyle} />}>
            MapLibre
          </Tabs.Tab>
        )}
        {mapboxExample && mapboxAccessToken && (
          <Tabs.Tab value="mapbox" leftSection={<IconMessageCircle style={iconStyle} />}>
            Mapbox
          </Tabs.Tab>
        )}
        {leafletExample && (
          <Tabs.Tab value="leaflet" leftSection={<IconSettings style={iconStyle} />}>
            Leaflet
          </Tabs.Tab>
        )}
      </Tabs.List>

      {mapLibreExample && (
        <Tabs.Panel value="mapLibre" h="calc(100% - 34px)">
          <MapLibreSplitPanelExample
            mapkaApiKey={mapkaApiKey}
            example={mapLibreExample}
            style={mapLibreStyle}
          />
        </Tabs.Panel>
      )}

      {mapboxAccessToken && mapboxExample && (
        <Tabs.Panel value="mapbox" h="calc(100% - 34px)">
          <MapboxSplitPanelExample
            mapboxAccessToken={mapboxAccessToken}
            example={mapboxExample}
            style={mapboxStyle}
          />
        </Tabs.Panel>
      )}

      {leafletExample && (
        <Tabs.Panel value="leaflet" h="calc(100% - 34px)">
          <LeafletSplitPanelExample example={leafletExample} />
        </Tabs.Panel>
      )}
    </Tabs>
  );
};
