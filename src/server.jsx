// Import External Dependencies
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';

// Import Utilities
import { getPageTitle } from './utilities/content-utils';

// Import Components
import Site from './components/Site/Site';

// Import Images
import Favicon from './favicon.ico';

// Define bundles (previously used `Object.values(locals.assets)`) but
// can't retrieve from there anymore due to separate compilation.
const bundles = [
  '/vendor.bundle.js',
  '/index.bundle.js'
];

// Export method for `SSGPlugin`
export default locals => {
  let { assets } = locals.webpackStats.compilation;
  let title = getPageTitle(locals.content, locals.path);

  return ReactDOMServer.renderToString(
    <StaticRouter location={locals.path} context={{}}>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="theme-color" content="#2B3A42" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
          <meta name="description" content="webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset." />
          <link rel="icon" type="image/x-icon" href={ Favicon } />
          { Object.keys(assets).filter(asset => /\.css$/.test(asset)).map(path => (
            <link key={ path } rel="stylesheet" href={ `/${path}` } />
          ))}
        </head>
        <body>
          <div id="root">
            <Route
              path="/"
              render={ props => (
                <Site
                  { ...props }
                  import={ path => require(`./content/${path}`) } />
              )} />
          </div>
          { bundles.map(path => <script key={ path } src={ path } />) }
        </body>
      </html>
    </StaticRouter>
  );
};
