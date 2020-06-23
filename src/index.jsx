// Import External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrowserRouter as AnalyticsRouter } from 'react-plausible-analytics';

require('offline-plugin/runtime').install();

// Import Components
import Site from './components/Site/Site';

// Import helpers
import isClient from './utilities/is-client';

const isProduction = process.env.NODE_ENV === 'production';
const Router = isProduction ? AnalyticsRouter : BrowserRouter;

const render = isProduction ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  render((
    <Router id="we_need_to_add_the_plausible_id_here">
      <Route
        path="/"
        render={ props => (
          <Site
            { ...props }
            import={ path => import(`./content/${path}`) } />
        )} />
    </Router>
  ), document.getElementById('root'));
}
