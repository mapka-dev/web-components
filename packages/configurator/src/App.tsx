import { MapboxMap } from "@mapka/mapbox-map/src";
import { MapLibreMap } from "@mapka/maplibre-map";

function App() {
  return (
    <>
      <MapLibreMap height={400} width={400}/>
      <MapboxMap 
        height={400} 
        width={400}
        accessToken="pk.eyJ1IjoibWFyY2lua29wYWN6IiwiYSI6ImNrenlteHJvaTAxdWUzY254ZHppMG5nN3QifQ.U3tuBCRNFosiS3buKpUxnQ"
      />
    </>
);
}

export default App;
