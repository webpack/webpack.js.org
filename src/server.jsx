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
<<<<<<< HEAD
  let { assets } = locals.webpackStats.compilation;

  let title = 'webpack 官方中文文档';
  let description =
    'webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换（transform）、打包（bundle）或包裹（package）任何资源(resource or asset)。';

  const renderedHtml = ReactDOMServer.renderToString(
    <StaticRouter location={locals.path} context={{}}>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="theme-color" content="#2B3A42" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {isPrintPage(locals.path) ? (
            <meta name="robots" content="noindex,nofollow" />
          ) : null}
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:site_name" content="webpack" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            name="description"
            content={description}
          />
          <meta
            property="og:image"
            content={`https://webpack.js.org${OgImage}`}
          />
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" content="@webpack" />
          <meta property="twitter:creator" content="@webpack" />
          <meta property="twitter:domain" content="https://webpack.js.org/" />
          <meta name="keywords" content="webpack5, webpack, webpack 中文文档, 印记中文, docschina, docschina.org, webpack.docschina.org, doc.react-china.org, nodejs.cn, vue.docschina.org, babel.docschina.org, parceljs.docschina.org, rollup.docschina.org, koajs.docschina.org"></meta>
          <link rel="icon" type="image/x-icon" href={Favicon} />
          {Object.keys(assets)
            .filter((asset) => /\.css$/.test(asset))
            .map((path) => (
              <link key={path} rel="stylesheet" href={`/${path}`} />
            ))}
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="canonical"
            href={`https://webpack.js.org${enforceTrailingSlash(locals.path)}`}
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="icon" sizes="192x192" href="/icon_192x192.png" />
          <link rel="icon" sizes="512x512" href="/icon_512x512.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="webpack" />
          <link rel="apple-touch-icon" href="/icon_180x180.png" />
          <link rel="mask-icon" href={Logo} color="#465e69" />
          <meta name="msapplication-TileImage" content="/icon_150x150.png" />
          <meta name="msapplication-TileColor" content="#465e69" />
        </head>
=======
  const helmetContext = {};

  const renderedHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={locals.path} context={{}}>
>>>>>>> 3319e6dc4b32e2b9baf800a66354ebc5e51ed343
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
            assets.js.map((path) => <script key={path} src={path} />)
          )}
          {
            <StatsScript/>
          }
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
