import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Site from './components/Site/Site';

// TODO: Re-integrate <GoogleAnalytics analyticsId="UA-46921629-2" />
// Consider `react-g-analytics` package

const render = process.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if ( window.document !== undefined ) {
  render((
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
