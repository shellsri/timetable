import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Tempappppp";     // ✅ fixed path
import "./index.css";        // ✅ fixed path

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
