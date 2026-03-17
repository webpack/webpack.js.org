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
          // i.e., can't reuse App.jsx
          // eslint-disable-next-line no-undef
          loadContent={(path) => require(`./content/${path}`)}
        />
      </HelmetProvider>
    </StaticRouter>,
  );

  const css = assets.css
    .map((path) => `<link rel="stylesheet" href="${path}" />`)
    .join("");

  const scripts = isPrintPage(locals.path)
    ? ReactDOMServer.renderToStaticMarkup(<PrintScript />)
    : assets.js.map((path) => `<script src="${path}"></script>`).join("");

  // React 19 hoists head tags into the start of renderedHtml — extract and move to <head>
  const headTagsMatch = renderedHtml.match(
    /^((?:<(?:meta|link|base)[^>]*\/?>|<title>[^<]*<\/title>|<style[^>]*>[\s\S]*?<\/style>|<noscript[^>]*>[\s\S]*?<\/noscript>)*)/,
  );
  const hoistedTags = headTagsMatch ? headTagsMatch[1] : "";
  const bodyHtml = renderedHtml.slice(hoistedTags.length);

  return `<!DOCTYPE html><html><head>${css}${hoistedTags}</head><body><div id="root">${bodyHtml}</div>${scripts}</body></html>`;
};
