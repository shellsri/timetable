import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";     // ✅ fixed path
import "./index.css";        // ✅ fixed path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
