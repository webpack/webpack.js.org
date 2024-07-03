// Import External Dependencies
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsRouter from './AnalyticsRouter.jsx';

import App from './App.jsx';

import './styles/tailwind.css';
// Import helpers
import { HelmetProvider } from 'react-helmet-async';
import { StrictMode } from 'react';

const isProduction = process.env.NODE_ENV === 'production';

const Router = isProduction ? AnalyticsRouter : BrowserRouter;
const container = document.getElementById('root');
const JSX = () => (
  <StrictMode>
    <Router id="UA-46921629-2">
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </StrictMode>
);
if (isProduction) {
  hydrateRoot(container, <JSX />);
} else {
  const root = createRoot(container);
  root.render(<JSX />);
}
