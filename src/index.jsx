// Import External Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// Import Components
import Site from './components/Site/Site';

// Import helpers
import isClient from './utilities/is-client';
        
// Import Utilities
import { FindInContent } from './utilities/content-utils';

// Import Content Tree
import Content from './_content.json';

// TODO: Re-integrate <GoogleAnalytics analyticsId="UA-46921629-2" />
// Consider `react-g-analytics` package

const render = process.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  let { pathname } = window.location;
  let trimmed = pathname.replace(/(.+)\/$/, '$1');
  let entryPage = FindInContent(Content, item => item.url === trimmed);
  let entryPath = entryPage.path.replace('src/content/', '');

  import(`./content/${entryPath}`).then(entryModule => {
    render((
      <BrowserRouter>
        <Route
          path="/"
          render={ props => (
            <Site
              { ...props }
              import={ path => {
                if ( path === entryPath ) {
                  return entryModule.default || entryModule;

                } else return import(`./content/${path}`);
              }} />
          )} />
      </BrowserRouter>
    ), document.getElementById('root'));
  });
}
