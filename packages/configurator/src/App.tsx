import { Stack } from "@mantine/core";
import { SplitPanelExampleCard } from "./components/SplitPanelExampleCard";
import { trimCode } from "./utils/dash";

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function App() {
  const mapLibreCodeExample = {
    code: trimCode(
      4,
      `
    map.addSource('urban-areas', {
      'type': 'geojson',
      'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_urban_areas.geojson'
    });
    map.addLayer(
      {
        'id': 'urban-areas-fill',
        'type': 'fill',
        'source': 'urban-areas',
        'layout': {},
        'paint': {
          'fill-color': '#f08',
          'fill-opacity': 0.4
        }
      },
    );
    `,
    ),
  };

  const leafletCodeExample = {
    code: trimCode(
      4,
      `
      const data = await fetch(
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_urban_areas.geojson"
        ).then((response) => response.json())
      
      const geoJsonLayer = L.geoJSON(data);
      map.addLayer(geoJsonLayer);
    `,
    ),
  };

  return (
    <Stack h="100vh" pt="200px" align="center" bg={"gray.1"}>
      <SplitPanelExampleCard
        mapLibreExample={mapLibreCodeExample}
        mapboxExample={mapLibreCodeExample}
        leafletExample={leafletCodeExample}
        mapboxAccessToken={mapboxAccessToken}
      />
    </Stack>
  );
}
