import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { ImageOverlay, MapContainer, Polyline, useMapEvent } from "react-leaflet";

// Floor images
const floorImages = {
  "0": "ground floor.png",
  "1": "campway.png",
  "2": "Second floor.png",
  "3": "Third floor.png"
};

const imageBounds = [[0, 1119], [992, 100]];

// 📍 Multi-floor Locations
const locations = {
  "0": {
    "stairs1": [175.18, 882.82],
    "stairs2": [593.18, 323.95],
    "ms101": [243.18, 760.87],
    "ms102": [241.18, 624.92],
    "ms103": [247.18, 347.03],
    "ms104": [313.18, 760.87],
    "ms105": [481.18, 409.01],
    "ms106": [631.18, 323.95],
    "ms107": [631.18, 503.24],
    "ms108": [631.18, 799.76],
    "restroom": [926.88, 1039.76],
    "window": [57.88, 1039.76],
    "lift": [311.18, 882.82],
    "h11": [275.18, 1039.76],
    "h12": [275.18, 882.82],
    "h13": [275.18, 760.87],
    "h14": [275.18, 624.92],
    "h15": [275.18, 444.99],
    "h16": [275.18, 347.03],
    "h21": [481.18, 450.99],
    "h22": [593.18, 452.99],
    "h31": [593.18, 319.04],
    "h32": [593.18, 503.24],
    "h33": [593.18, 799.76],
    "h41": [839.50, 1039.76],
    "h42": [593.18, 1039.76]
  },
   "1": {
      "stairs1": [175.18, 882.82],
      "stairs2": [593.18, 323.95],
      "ms201": [243.18, 760.87],
      "ms202": [241.18, 624.92],
      "ms203": [247.18, 347.03],
      "ms204": [313.18, 760.87],
      "ms205": [313.18, 624.92],
      "ms206": [481.18, 409.01],
      "ms207": [631.18, 323.95],
      "ms208": [631.18, 503.24],
      "ms209": [631.18, 799.76],
      "restroom": [926.88, 1039.76],
      "window": [57.88, 1039.76],
      "lift": [311.18, 882.82],
      "h11": [275.18, 1039.76],
      "h12": [275.18, 882.82],
      "h13": [275.18, 760.87],
      "h14": [275.18, 624.92],
      "h15": [275.18, 444.99],
      "h16": [275.18, 347.03],
      "h21": [481.18, 450.99],
      "h22": [593.18, 452.99],
      "h31": [593.18, 319.04],
      "h32": [593.18, 503.24],
      "h33": [593.18, 799.76],
      "h41": [839.50, 1039.76],
      "h42": [593.18, 1039.76]
    },
    "2": {
      "stairs1": [175.18, 882.82],
      "stairs2": [593.18, 323.95],
      "ms301": [243.18, 760.87],
      "ms302": [241.18, 624.92],
      "ms303": [247.18, 347.03],
      "ms304": [313.18, 760.87],
      "ms305": [481.18, 409.01],
      "ms306": [631.18, 323.95],
      "ms307": [631.18, 503.24],
      "ms308": [631.18, 799.76],
      "restroom": [926.88, 1039.76],
      "window": [57.88, 1039.76],
      "lift": [311.18, 882.82],
      "h11": [275.18, 1039.76],
      "h12": [275.18, 882.82],
      "h13": [275.18, 760.87],
      "h14": [275.18, 624.92],
      "h15": [275.18, 444.99],
      "h16": [275.18, 347.03],
      "h21": [481.18, 450.99],
      "h22": [593.18, 452.99],
      "h31": [593.18, 319.04],
      "h32": [593.18, 503.24],
      "h33": [593.18, 799.76],
      "h41": [839.50, 1039.76],
      "h42": [593.18, 1039.76]
    },
    "3":{
  "stairs1": [175.18, 882.82],
  "stairs2": [593.18, 323.95],
  "ms401": [243.18, 760.87],
  "ms402": [241.18, 624.92],
  "ms403": [247.18, 347.03],
  "ms404":[313.18, 760.87],

  "ms405": [481.18, 409.01],
  "ms406": [631.18, 323.95],
  "ms407": [631.18, 503.24],
  "ms408": [631.18, 799.76],
  "restroom": [926.88, 1039.76],
  "window": [57.88, 1039.76],
  "lift": [311.18, 882.82],
  "h11": [275.18, 1039.76],
  "h12": [275.18, 882.82],
  "h13": [275.18, 760.87],
  "h14": [275.18, 624.92],
  "h15": [275.18, 444.99],
  "h16": [275.18, 347.03],
  "h21": [481.18, 450.99],
  "h22": [593.18, 452.99],
  "h31": [593.18, 319.04],
  "h32": [593.18, 503.24],
  "h33": [593.18, 799.76],
  "h41": [839.50, 1039.76],
  "h42": [593.18, 1039.76]
}
};
// 🔗 Multi-floor Graph
const graph = {
  "0": {
    "stairs1": { "h12": 20 },
    "ms101": { "h13": 5 },
    "ms102": { "h14": 5 },
    "ms103": { "h16": 5 },
    "ms105": { "h21": 5 },
    "stairs2": { "h31": 5 },
    "ms106": { "h31": 5 },
    "ms107": { "h32": 5 },
    "ms108": { "h33": 5 },
    "restroom": { "h41": 5 },
    "lift": { "h12": 5 },
    "window": { "h11": 20 },
    "h11": { "window": 20, "h42": 20 },
    "h12": { "stairs1": 20, "lift": 5, "h11": 10, "h13": 10 },
    "h13": { "ms101": 5, "h12": 10, "h14": 10 },
    "h14": { "ms102": 5, "h13": 10, "h15": 10 },
    "h15": { "h14": 10, "h16": 10, "h21": 10 },
    "h16": { "ms103": 5, "h15": 10 },
    "h21": { "ms105": 5, "h15": 10, "h22": 10 },
    "h22": { "h31": 10, "h32": 10, "h21": 10 },
    "h31": { "stairs2": 5, "ms106": 5, "h22": 10 },
    "h32": { "ms107": 5, "h22": 10, "h33": 10 },
    "h33": { "ms108": 5, "h32": 10, "h42": 10 },
    "h42": { "h41": 10, "h11": 20, "h33": 10 },
    "h41": { "restroom": 5, "h42": 10 }
  },
"1": {
      "stairs1": { "h12": 20 },
      "ms201": { "h13": 5 },
      "ms202": { "h14": 5 },
      "ms203": { "h16": 5 },
      "ms205": { "h21": 5 },
      "stairs2": { "h31": 5 },
      "ms206": { "h31": 5 },
      "ms207": { "h32": 5 },
      "ms208": { "h33": 5 },
      "restroom": { "h41": 5 },
      "lift": { "h12": 5 },
      "window": { "h11": 20 },
      "h11": { "window": 20, "h42": 20 },
      "h12": { "stairs1": 20, "lift": 5, "h11": 10, "h13": 10 },
      "h13": { "ms201": 5, "h12": 10, "h14": 10 },
      "h14": { "ms202": 5, "h13": 10, "h15": 10 },
      "h15": { "h14": 10, "h16": 10, "h21": 10 },
      "h16": { "ms203": 5, "h15": 10 },
      "h21": { "ms205": 5, "h15": 10, "h22": 10 },
      "h22": { "h31": 10, "h32": 10, "h21": 10 },
      "h31": { "stairs2": 5, "ms206": 5, "h22": 10 },
      "h32": { "ms207": 5, "h22": 10, "h33": 10 },
      "h33": { "ms208": 5, "h32": 10, "h42": 10 },
      "h42": { "h41": 10, "h11": 20, "h33": 10 },
      "h41": { "restroom": 5, "h42": 10 }
    },
    "2": {
      "stairs1": { "h12": 20 },
      "ms301": { "h13": 5 },
      "ms302": { "h14": 5 },
      "ms303": { "h16": 5 },
      "ms305": { "h21": 5 },
      "stairs2": { "h31": 5 },
      "ms306": { "h31": 5 },
      "ms307": { "h32": 5 },
      "ms308": { "h33": 5 },
      "restroom": { "h41": 5 },
      "lift": { "h12": 5 },
      "window": { "h11": 20 },
      "h11": { "window": 20, "h42": 20 },
      "h12": { "stairs1": 20, "lift": 5, "h11": 10, "h13": 10 },
      "h13": { "ms301": 5, "h12": 10, "h14": 10 },
      "h14": { "ms302": 5, "h13": 10, "h15": 10 },
      "h15": { "h14": 10, "h16": 10, "h21": 10 },
      "h16": { "ms303": 5, "h15": 10 },
      "h21": { "ms305": 5, "h15": 10, "h22": 10 },
      "h22": { "h31": 10, "h32": 10, "h21": 10 },
      "h31": { "stairs2": 5, "ms306": 5, "h22": 10 },
      "h32": { "ms307": 5, "h22": 10, "h33": 10 },
      "h33": { "ms308": 5, "h32": 10, "h42": 10 },
      "h42": { "h41": 10, "h11": 20, "h33": 10 },
      "h41": { "restroom": 5, "h42": 10 }
    },
    "3": {
      "stairs1": { "h12": 20 },
      "ms401": { "h13": 5 },
      "ms402": { "h14": 5 },
      "ms403": { "h16": 5 },
      "ms405": { "h21": 5 },
      "stairs2": { "h31": 5 },
      "ms406": { "h31": 5 },
      "ms407": { "h32": 5 },
      "ms408": { "h33": 5 },
      "restroom": { "h41": 5 },
      "lift": { "h12": 5 },
      "window": { "h11": 20 },
      "h11": { "window": 20, "h42": 20 },
      "h12": { "stairs1": 20, "lift": 5, "h11": 10, "h13": 10 },
      "h13": { "ms401": 5, "h12": 10, "h14": 10 },
      "h14": { "ms402": 5, "h13": 10, "h15": 10 },
      "h15": { "h14": 10, "h16": 10, "h21": 10 },
      "h16": { "ms403": 5, "h15": 10 },
      "h21": { "ms405": 5, "h15": 10, "h22": 10 },
      "h22": { "h31": 10, "h32": 10, "h21": 10 },
      "h31": { "stairs2": 5, "ms406": 5, "h22": 10 },
      "h32": { "ms407": 5, "h22": 10, "h33": 10 },
      "h33": { "ms408": 5, "h32": 10, "h42": 10 },
      "h42": { "h41": 10, "h11": 20, "h33": 10 },
      "h41": { "restroom": 5, "h42": 10 }
    }
  };
  

// 🛤️ Dijkstra Algorithm
const dijkstra = (graph, start, end) => {
  let distances = {};
  let prev = {};
  let queue = new Set(Object.keys(graph));

  for (let node of queue) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (queue.size) {
    let current = Array.from(queue).reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    if (current === end) {
      let path = [];
      while (current) {
        path.unshift(current);
        current = prev[current];
      }
      return path;
    }

    queue.delete(current);

    for (let neighbor in graph[current]) {
      let alt = distances[current] + graph[current][neighbor];

      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = current;
      }
    }
  }

  return null;
};

// 🖱️ Handle Map Click
const MapClickHandler = () => {
  useMapEvent("click", (e) => {
    alert(`Clicked at pixel coordinates: ${e.latlng.lng.toFixed(2)}, ${e.latlng.lat.toFixed(2)}`);
  });

  return null;
};

// 🌍 Main Map Component
const MapComponent = () => {
  const [floor, setFloor] = useState("0");  // Default to ground floor
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [path, setPath] = useState([]);

  // 🛤️ Filter locations & paths based on selected floor
  const filteredLocations = Object.keys(locations[floor]);
  const filteredGraph = graph[floor];

  const handleFindPath = () => {
    if (!start || !end) return;
    const shortestPath = dijkstra(filteredGraph, start, end);
    setPath(shortestPath?.map((node) => locations[floor][node]) || []);
  };

  return (
    <div>
      {/* Floor Selection */}
      <div style={{ marginBottom: "10px" }}>
        <label>Select Floor: </label>
        <select value={floor} onChange={(e) => setFloor(e.target.value)}>
          <option value="0">Ground Floor</option>
          <option value="1">Floor 1</option>
          <option value="2">Floor 2</option>
          <option value="3">Floor 3</option>
        </select>
      </div>

      {/* Path Selection */}
      <div style={{ marginBottom: "10px" }}>
        <label>Start: </label>
        <select value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="">Select</option>
          {filteredLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "10px" }}>End: </label>
        <select value={end} onChange={(e) => setEnd(e.target.value)}>
          <option value="">Select</option>
          {filteredLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button onClick={handleFindPath}>Find Path</button>
      </div>

      <MapContainer center={locations[floor]["lift"]} zoom={16} style={{ height: "500px" }}>
        <ImageOverlay url={floorImages[floor]} bounds={imageBounds} />
        {path.length > 0 && (
          <Polyline positions={path} color="blue" weight={5} />
        )}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
