import type { FC } from "react";
import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { LeafletSplitPanelExample } from "./LeafletSplitPanelExample";
import { MapLibreSplitPanelExample } from "./MapLibreSplitPanelExample";
import { MapboxSplitPanelExample } from "./MapboxSplitPanelExample";

export interface MapExample {
  code?: string;
}

interface SplitPanelExampleProps {
  mapLibreExample?: MapExample;
  mapboxExample?: MapExample;
  mapboxAccessToken?: string;  
  leafletExample?: MapExample;
  defaultValue?: "mapLibre" | "mapbox" | "leaflet";
}

export const SplitPanelExample: FC<SplitPanelExampleProps> = ({
  mapLibreExample,
  mapboxExample,
  mapboxAccessToken,
  leafletExample,
  defaultValue = "mapLibre",
}) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs variant="pills" radius="sm" keepMounted={false} defaultValue={defaultValue}>
      <Tabs.List>
        {mapLibreExample && (
          <Tabs.Tab value="mapLibre" leftSection={<IconPhoto style={iconStyle} />}>
            MapLibre
          </Tabs.Tab>
        )}
        {mapboxExample && (
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
        <Tabs.Panel value="mapLibre" h="800px">
          <MapLibreSplitPanelExample example={mapLibreExample} />
        </Tabs.Panel>
      )}

      {mapboxAccessToken && mapboxExample && (
        <Tabs.Panel value="mapbox" h="800px">
          <MapboxSplitPanelExample mapboxAccessToken={mapboxAccessToken} example={mapboxExample} />
        </Tabs.Panel>
      )}

      {leafletExample && (
        <Tabs.Panel value="leaflet" h="800px">
          <LeafletSplitPanelExample example={leafletExample} />
        </Tabs.Panel>
      )}
    </Tabs>
  );
};
