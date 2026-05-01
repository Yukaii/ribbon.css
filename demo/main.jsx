import React from "react";
import { createRoot } from "react-dom/client";
import { RetroRibbon } from "../src/RetroRibbon.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RetroRibbon />
  </React.StrictMode>
);
