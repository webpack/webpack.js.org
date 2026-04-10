// Import External Dependencies
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./styles/tailwind.css";
// Import helpers
import isClient from "./utilities/is-client.js";

const isProduction = process.env.NODE_ENV === "production";

// Client Side Rendering
if (isClient) {
  const container = document.getElementById("root");

  const app = (
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  );

  if (isProduction) {
    hydrateRoot(container, app, {
      onRecoverableError: (error) => {
        console.error("Hydration error:", error);
      },
    });
  } else {
    const root = createRoot(container);
    root.render(app);
  }
}
