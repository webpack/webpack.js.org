// Import External Dependencies
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';

// Import Utilities
import { getPageTitle } from './utilities/content-utils';

// Import Components
import Site from './components/Site/Site';
import PrintScript from './components/Print/PrintScript';
import StatsScript from './components/Stats/StatsScript';

// Import Images
import Favicon from './favicon.ico';
import Logo from './assets/logo-on-white-bg.svg';
import OgImage from './assets/icon-pwa-512x512.png';

// Define bundles (previously used `Object.values(locals.assets)`) but
// can't retrieve from there anymore due to separate compilation.
const bundles = ['/vendor.bundle.js', '/index.bundle.js'];

// As github pages uses trailing slash, we need to provide it to canonicals for consistency
// between canonical href and final url served by github pages.
function enforceTrailingSlash(url) {
  return url.replace(/\/?$/, '/');
}

function isPrintPage(url) {
  return url.includes('/printable');
}

// Export method for `SSGPlugin`
export default (locals) => {
  let { assets } = locals.webpackStats.compilation;

<<<<<<< HEAD
  let title = 'webpack 官方中文文档';
  let description = 'webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换（transform）、打包（bundle）或包裹（package）任何资源(resource or asset)。';
=======
  let title = getPageTitle(locals.content, locals.path);
  let description =
    'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.';
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5

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
<<<<<<< HEAD
          <meta name="keywords" content="webpack5, webpack, webpack 中文文档, 印记中文, docschina, docschina.org, webpack.docschina.org, doc.react-china.org, nodejs.cn, vue.docschina.org, babel.docschina.org, parceljs.docschina.org, rollup.docschina.org, koajs.docschina.org"></meta>
          <link rel="icon" type="image/x-icon" href={ Favicon } />
          { Object.keys(assets).filter(asset => /\.css$/.test(asset)).map(path => (
            <link key={ path } rel="stylesheet" href={ `/${path}` } />
          ))}
=======
          <link rel="icon" type="image/x-icon" href={Favicon} />
          {Object.keys(assets)
            .filter((asset) => /\.css$/.test(asset))
            .map((path) => (
              <link key={path} rel="stylesheet" href={`/${path}`} />
            ))}
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
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
        <body>
          <div id="root">
            <Route
              path="/"
              render={(props) => (
                <Site
                  {...props}
                  import={(path) => require(`./content/${path}`)}
                />
              )}
            />
          </div>
<<<<<<< HEAD
          {
            (isPrintPage(locals.path))
              ? <PrintScript />
              : bundles.map(path => <script key={ path } src={ path } />)
          }
          {
            <StatsScript/>
          }
=======
          {isPrintPage(locals.path) ? (
            <PrintScript />
          ) : (
            bundles.map((path) => <script key={path} src={path} />)
          )}
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
        </body>
      </html>
    </StaticRouter>
  );

  return '<!DOCTYPE html>' + renderedHtml;
};
