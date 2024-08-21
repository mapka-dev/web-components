import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import type { FC } from "react";
import { LeafletSplitPanelExample } from "./LeafletSplitPanelExample";
import { MapLibreSplitPanelExample } from "./MapLibreSplitPanelExample";
import { MapboxSplitPanelExample } from "./MapboxSplitPanelExample";

export interface MapExample {
  code?: string;
}

interface SplitPanelExampleProps {
  mapLibreExample?: MapExample;
  mapboxExample?: MapExample;
  leafletExample?: MapExample;
}

export const SplitPanelExample: FC<SplitPanelExampleProps> = ({
  mapLibreExample,
  mapboxExample,
  leafletExample,
}) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs variant="pills" radius="sm" keepMounted={false} defaultValue="maplibre">
      <Tabs.List>
        <Tabs.Tab value="maplibre" leftSection={<IconPhoto style={iconStyle} />}>
          MapLibre
        </Tabs.Tab>
        <Tabs.Tab value="mapbox" leftSection={<IconMessageCircle style={iconStyle} />}>
          Mapbox
        </Tabs.Tab>
        <Tabs.Tab value="leaflet" leftSection={<IconSettings style={iconStyle} />}>
          Leaflet
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="maplibre" h="800px">
        <MapLibreSplitPanelExample example={mapLibreExample} />
      </Tabs.Panel>

      <Tabs.Panel value="mapbox" h="800px">
        <MapboxSplitPanelExample example={mapboxExample} />
      </Tabs.Panel>

      <Tabs.Panel value="leaflet" h="800px">
        <LeafletSplitPanelExample example={leafletExample} />
      </Tabs.Panel>
    </Tabs>
  );
};
