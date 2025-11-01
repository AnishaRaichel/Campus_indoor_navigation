import React from "react";
import CollegeMap from "./CollegeMap"; 
import "leaflet/dist/leaflet.css";

;  // Import your map component

function App() {
  return (
    <div>
      <h1>Campus Navigation Map</h1>
      <CollegeMap />
    </div>
  );
}

export default App;
