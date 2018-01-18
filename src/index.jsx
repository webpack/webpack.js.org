import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom';
import Site from './components/Site/Site';
import Favicon from './favicon.ico';

// TODO: Re-integrate <GoogleAnalytics analyticsId="UA-46921629-2" />
// Consider `react-g-analytics` package

// Client Side Rendering
if ( window.document !== undefined ) {
  ReactDOM.render((
    <BrowserRouter>
      <Route path="/" component={ Site } />
    </BrowserRouter>
  ), document.getElementById('root'));
}

// Server Side Rendering
export default locals => {
  let { assets } = locals.webpackStats.compilation;

  return ReactDOMServer.renderToString(
    <StaticRouter location={ locals.path } context={{}}>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{/* TODO */} | webpack</title>
          <link rel="icon" type="image/x-icon" href={ Favicon } />
          { Object.keys(assets).filter(asset => /\.css$/.test(asset)).map(path => (
            <link key={ path } rel="stylesheet" href={ `/${path}` } />
          ))}
        </head>
        <body>
          <div id="root">
            <Route path="/" component={ Site } />
          </div>
          { Object.values(locals.assets).map(path => (
            <script key={ path } src={ path } />
          ))}
        </body>
      </html>
    </StaticRouter>
  );
};
