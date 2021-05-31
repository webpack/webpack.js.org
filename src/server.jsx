// Import External Dependencies
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';

// Import Components
import Site from './components/Site/Site';
import PrintScript from './components/Print/PrintScript';
import StatsScript from './components/Stats/StatsScript';

import { HelmetProvider } from 'react-helmet-async';

import assets from '../dist/prod-assets-manifest.json';

function isPrintPage(url) {
  return url.includes('/printable');
}

// Export method for `SSGPlugin`
export default (locals) => {
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
                  // i.e., can't  reuse App.jsx
                  import={(path) => require(`./content/${path}`)}
                />
              )}
            />
          </div>
          {isPrintPage(locals.path) ? (
            <PrintScript />
          ) : (
            assets.js.map((path) => <script key={path} src={path} />)
          )}
          {<StatsScript />}
        </body>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const css = assets.css
    .map((path) => `<link rel="stylesheet" href=${`${path}`} />`)
    .join('');

  return `<!DOCTYPE html><html ${helmet.htmlAttributes.toString()}><head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${css}</head>${renderedHtml}`;
};
