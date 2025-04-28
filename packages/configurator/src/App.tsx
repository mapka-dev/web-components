import { SplitPanelExample } from "./components/SplitPanelExample";
import { trimCode } from "./utils/dash";

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
      fetch("https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_urban_areas.geojson")
        .then((response) => response.json())
        .then((data) => {
          const geojsonLayer = L.geoJSON(data);
          map.addLayer(geojsonLayer);
        });
    `,
    ),
  };

  return (
    <SplitPanelExample
      mapLibreExample={mapLibreCodeExample}
      mapboxExample={mapLibreCodeExample}
      leafletExample={leafletCodeExample}
    />
  );
}
