import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Site from './components/Site/Site';

// Import helpers
import isBrowser from './utilities/isBrowser';

// TODO: Re-integrate <GoogleAnalytics analyticsId="UA-46921629-2" />
// Consider `react-g-analytics` package

// Client Side Rendering
if (isBrowser) {
  ReactDOM.render((
    <BrowserRouter>
      <Route
        path="/"
        render={ props => (
          <Site
            { ...props }
            import={ path => import(`./content/${path}`) } />
        )} />
    </BrowserRouter>
  ), document.getElementById('root'));
}
