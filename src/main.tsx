import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./reset.css";
import "./main.css";

// It was always intentional
// ~m0r715

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
