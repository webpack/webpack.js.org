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
    <StaticRouter location={locals.path}>
      <HelmetProvider>
        <Site
          // note that here we use require instead of import
          // i.e., can't  reuse App.jsx
          // eslint-disable-next-line no-undef
          import={(path) => require(`./content/${path}`)}
        />
      </HelmetProvider>
    </StaticRouter>,
  );

  const css = assets.css
    .map((path) => `<link rel="stylesheet" href=${`${path}`} />`)
    .join("");

  const scripts = isPrintPage(locals.path)
    ? ReactDOMServer.renderToStaticMarkup(<PrintScript />)
    : assets.js.map((path) => `<script src="${path}"></script>`).join("");

  // React 19 automatically hoists <title>, <meta>, <link> from the component
  // tree into <head> during renderToString, so manual helmet context
  // extraction is no longer needed.
  return `<!DOCTYPE html><html><head>${css}</head><body><div id="root">${renderedHtml}</div>${scripts}</body></html>`;
};
