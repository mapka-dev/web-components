// import { MapboxMap } from "@mapka/mapbox-map";
import { MapLibreMap } from "@mapka/maplibre-map";
import { SplitPanel } from "@mapka/split-panel";

customElements.define("split-panel", SplitPanel);


declare global {
  namespace JSX {
      interface IntrinsicElements {
          'split-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
  }
}
function App() {
  return (
    <div style={{width: "100%", height: "100vh"}}>
    <split-panel>
      <div slot="map-panel" >
        <MapLibreMap/>
      </div>

      <div slot="content-panel">
        Lolo
      </div>
    </split-panel>
    </div>
);
}

export default App;


/* <MapLibreMap height={400} width={400}/>
<MapboxMap 
  height={400} 
  width={400}
  accessToken="pk.eyJ1IjoibWFyY2lua29wYWN6IiwiYSI6ImNrenlteHJvaTAxdWUzY254ZHppMG5nN3QifQ.U3tuBCRNFosiS3buKpUxnQ"
/>
</> */