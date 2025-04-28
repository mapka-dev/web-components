import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { MapLibreSplitPanelExample } from "./MapLibreSplitPanelExample";
import { MapboxSplitPanelExample } from "./MapboxSplitPanelExample";
import { LeafletSplitPanelExample } from "./LeafletSplitPanelExample";
import type { FC } from "react";

export interface MapExample {
  code?: string;
}


interface SplitPanelExampleProps {
  mapLibreExample?: MapExample;
};

export const SplitPanelExample: FC<SplitPanelExampleProps> = ({mapLibreExample}) => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs radius="lg" defaultValue="maplibre">
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
        <MapLibreSplitPanelExample example={mapLibreExample}/>
      </Tabs.Panel>

      <Tabs.Panel value="mapbox" h="800px">
        <MapboxSplitPanelExample />
      </Tabs.Panel>

      <Tabs.Panel value="leaflet" h="800px">
        <LeafletSplitPanelExample />
      </Tabs.Panel>
    </Tabs>
  );
};
