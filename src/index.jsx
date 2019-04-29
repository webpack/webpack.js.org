// Import External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrowserRouter as AnalyticsRouter } from 'react-g-analytics';
// import IntersectionObserver polyfill until safari ^12.x.x is not within monthly visitors.
import 'intersection-observer';

// Import Components
import Site from './components/Site/Site';

// Import helpers
import isClient from './utilities/is-client';

const Router = process.env.NODE_ENV === 'production' ? AnalyticsRouter : BrowserRouter;
const render = process.env.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  render((
    <Router id="UA-46921629-2">
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
