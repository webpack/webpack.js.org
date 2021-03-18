// Import External Dependencies
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';

// Import Components
import Site from './components/Site/Site';
import PrintScript from './components/Print/PrintScript';

import { HelmetProvider } from 'react-helmet-async';

// Define bundles (previously used `Object.values(locals.assets)`) but
// can't retrieve from there anymore due to separate compilation.
const bundles = ['/vendor.bundle.js', '/index.bundle.js'];

function isPrintPage(url) {
  return url.includes('/printable');
}

// Export method for `SSGPlugin`
export default (locals) => {
  let { assets } = locals.webpackStats.compilation;

  const helmetContext = {};

  const renderedHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={locals.path} context={{}}>
        <body>
          <div id="root">
            <Route
              path="/"
              render={(props) => (
                <Site
                  {...props}
                  // note that here we use require instead of import
                  // i.e., can't just reuse App.jsx
                  import={(path) => require(`./content/${path}`)}
                />
              )}
            />
          </div>
          {isPrintPage(locals.path) ? (
            <PrintScript />
          ) : (
            bundles.map((path) => <script key={path} src={path} />)
          )}
        </body>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const css = Object.keys(assets)
    .filter((asset) => /\.css$/.test(asset))
    .map((path) => `<link rel="stylesheet" href=${`/${path}`} />`)
    .join('');

  return `<!DOCTYPE html><html ${helmet.htmlAttributes.toString()}><head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${css}</head>${renderedHtml}`;
};
