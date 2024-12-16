import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import HexagonBackground from "./hexagon";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HexagonBackground>
      <App />
    </HexagonBackground>
  </StrictMode>,
);
