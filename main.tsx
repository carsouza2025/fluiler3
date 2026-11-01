import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CommunicationProvider } from "./components/CommunicationContext";
import { AccessibilityRoot } from "./components/AccessibilityControls";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AccessibilityRoot><CommunicationProvider><App /></CommunicationProvider></AccessibilityRoot>
  </StrictMode>
);

import "./premium.css";
