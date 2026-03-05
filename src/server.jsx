// Import External Dependencies
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

// Import Components
import Site from './components/Site/Site';
import PrintScript from './components/Print/PrintScript';

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
      <StaticRouter location={locals.path}>
        <body>
          <div id="root">
            <Site
              // note that here we use require instead of import
              // i.e., can't  reuse App.jsx
              import={(path) => require(`./content/${path}`)}
            />
          </div>
          {isPrintPage(locals.path) ? (
            <PrintScript />
          ) : (
            assets.js.map((path) => <script key={path} src={path} />)
          )}
        </body>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const css = assets.css
    .map((path) => `<link rel="stylesheet" href=${`${path}`} />`)
    .join('');

  // react-helmet-async v3 + React 19: helmet context is not populated because
  // React 19 renders <title>/<meta>/<link> as native elements directly in the tree.
  const htmlAttributes = helmet ? helmet.htmlAttributes.toString() : '';
  const title = helmet ? helmet.title.toString() : '';
  const meta = helmet ? helmet.meta.toString() : '';
  const link = helmet ? helmet.link.toString() : '';

  return `<!DOCTYPE html><html ${htmlAttributes}><head>${title}${meta}${link}${css}</head>${renderedHtml}`;
};
