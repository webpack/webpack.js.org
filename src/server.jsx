// Import External Dependencies
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router";
// Import Components
// eslint-disable-next-line import/no-unresolved
import assets from "../dist/prod-assets-manifest.json";
import PrintScript from "./components/Print/PrintScript.jsx";
import Site from "./components/Site/Site.jsx";

function isPrintPage(url) {
  return url.includes("/printable");
}

// Export method for `SSGPlugin`
export default (locals) => {
  const renderedHtml = ReactDOMServer.renderToString(
    <HelmetProvider>
      <StaticRouter location={locals.path}>
        <body>
          <div id="root">
            <Site
              // note that here we use require instead of import
              // i.e., can't  reuse App.jsx
              // eslint-disable-next-line no-undef
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
    </HelmetProvider>,
  );

  const css = assets.css
    .map((path) => `<link rel="stylesheet" href=${`${path}`} />`)
    .join("");

  // React 19 automatically hoists <title>, <meta>, <link> from the component
  // tree into <head> during renderToString, so manual helmet context
  // extraction is no longer needed.
  return `<!DOCTYPE html><html><head>${css}</head>${renderedHtml}`;
};
