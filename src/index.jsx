// Import External Dependencies
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AnalyticsRouter from './AnalyticsRouter.jsx';

import App from './App.jsx';

import './styles/tailwind.css';
// Import helpers
import isClient from './utilities/is-client';
import { HelmetProvider } from 'react-helmet-async';

const isProduction = process.env.NODE_ENV === 'production';

const Router = isProduction ? AnalyticsRouter : BrowserRouter;
const render = isProduction ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  render(
    <Router id="UA-46921629-2">
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>,
    document.getElementById('root')
  );
}
