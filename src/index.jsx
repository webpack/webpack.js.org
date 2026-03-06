// Import External Dependencies
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import AnalyticsRouter from "./AnalyticsRouter.jsx";

import App from "./App.jsx";

import "./styles/tailwind.css";
// Import helpers
import isClient from "./utilities/is-client.js";

const isProduction = process.env.NODE_ENV === "production";

const Router = isProduction ? AnalyticsRouter : BrowserRouter;

// Client Side Rendering
if (isClient) {
  const container = document.getElementById("root");

  const app = (
    <Router id="UA-46921629-2">
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  );

  if (isProduction) {
    hydrateRoot(container, app);
  } else {
    const root = createRoot(container);
    root.render(app);
  }
}
