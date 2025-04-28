import { Tabs, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";
import { MapLibreSplitPanelExample } from "./components/MapLibreSplitPanelExample";
import { MapboxSplitPanelExample } from "./components/MapboxSplitPanelExample";
import { LeafletSplitPanelExample } from "./components/LeafletSplitPanelExample";

export function App() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs radius="lg" defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
          MapLibre
        </Tabs.Tab>
        <Tabs.Tab value="messages" leftSection={<IconMessageCircle style={iconStyle} />}>
          Mapbox
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
          Leaflet
        </Tabs.Tab>
        <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
          Deck.GL
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" h="800px">
        <MapLibreSplitPanelExample />
      </Tabs.Panel>

      <Tabs.Panel value="messages" h="800px">
        <MapboxSplitPanelExample />
      </Tabs.Panel>

      <Tabs.Panel value="settings" h="800px">
        <LeafletSplitPanelExample />
      </Tabs.Panel>
    </Tabs>
  );
}
