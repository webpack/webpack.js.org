// Import External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// Import Components
import Site from './components/Site/Site';

// Import helpers
import isClient from './utilities/is-client';

const isProduction = process.env.NODE_ENV === 'production';

const render = isProduction ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
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
