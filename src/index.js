import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Import main App component
import "./index.css";  // Optional: Include global styles if needed

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
