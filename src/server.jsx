// Import External Dependencies
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";

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
  const helmetContext = {};

  const renderedHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
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

  const { helmet } = helmetContext;

  const css = assets.css
    .map((path) => `<link rel="stylesheet" href=${`${path}`} />`)
    .join("");

  return `<!DOCTYPE html><html ${helmet.htmlAttributes.toString()}><head>${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}${css}</head>${renderedHtml}`;
};
