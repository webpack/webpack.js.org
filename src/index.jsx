import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import AnalyticsRouter from 'react-g-analytics';
import Site from './components/Site/Site';

const Router = process.env.NODE_ENV === 'production' ? AnalyticsRouter : BrowserRouter;

// Client Side Rendering
if ( window.document !== undefined ) {
  ReactDOM.render((
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
