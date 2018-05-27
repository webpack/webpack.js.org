// Import External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrowserRouter as AnalyticsRouter } from 'react-g-analytics';

// Import Components
import Site from './components/Site/Site';

// Import helpers
import isClient from './utilities/is-client';

// Import Utilities
import { findInContent } from './utilities/content-utils';

// Import Content Tree
import Content from './_content.json';

const Router = process.env.NODE_ENV === 'production' ? AnalyticsRouter : BrowserRouter;
const render = process.env.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  let { pathname } = window.location;
  let trimmed = pathname.replace(/(.+)\/$/, '$1');
  let entryPage = findInContent(Content, item => item.url === trimmed);
  let entryPath = entryPage.path.replace('src/content/', '');

  import(`./content/${entryPath}`).then(entryModule => {
    render((
      <Router id="UA-46921629-2">
        <Route
          path="/"
          render={ props => (
            <Site
              { ...props }
              import={ path => {
                if (path === entryPath) {
                  return entryModule.default || entryModule;
                } else {
                  return import(`./content/${path}`);
                }
              }} />
          )} />
      </Router>
    ), document.getElementById('root'));
  });
}
