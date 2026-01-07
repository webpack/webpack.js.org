// Import External Dependencies
import { Fragment, useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Utilities
import {
  extractPages,
  extractSections,
  getPageDescription,
  getPageTitle,
} from '../../utilities/content-utils.mjs';
import isClient from '../../utilities/is-client';
import getAdjacentPages from '../../utilities/get-adjacent-pages/index.mjs';

// Import Components
import NotificationBar from '../NotificationBar/NotificationBar';
import Navigation from '../Navigation/Navigation';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Container from '../Container/Container';
import Splash from '../Splash/Splash';
import Sponsors from '../Sponsors/Sponsors';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Helmet } from 'react-helmet-async';

import Favicon from '../../favicon.ico';
import Logo from '../../assets/logo-on-white-bg.svg';
import OgImage from '../../assets/icon-pwa-512x512.png';

// Load Styling
import '../../styles/index';
import './Site.scss';

// Load Content Tree
import Content from '../../_content.json';

import clientSideRedirections from './clientSideRedirections';

Site.propTypes = {
  import: PropTypes.func,
};
function Site(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  /**
   * Toggle the mobile sidebar
   *
   */
  const _toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  /**
   * Strip any non-applicable properties
   *
   * @param  {array} array - ...
   * @return {array}       - ...
   */
  const _strip = (array) => {
    let anchorTitleIndex = array.findIndex(
      (item) => item.name.toLowerCase() === 'index.mdx'
    );

    if (anchorTitleIndex !== -1) {
      array.unshift(array[anchorTitleIndex]);

      array.splice(anchorTitleIndex + 1, 1);
    }

    return array
      .map(({ title, name, url, group, sort, anchors, children }) => ({
        title: title || name,
        content: title || name,
        url,
        group,
        sort,
        anchors,
        children: children ? _strip(children) : [],
      }))
      .filter(
        (page) =>
          page.title !== 'printable.mdx' && !page.content.includes('Printable')
      );
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      if (process.env.NODE_ENV === 'production') {
        // only register sw.js in production
        if ('serviceWorker' in navigator) {
          // dynamic load sw
          import('workbox-window/Workbox.mjs').then(({ Workbox }) => {
            const wb = new Workbox('/sw.js');

            // listen to `waiting` event
            wb.addEventListener('waiting', () => {
              // log and show updateBox
              console.log(
                // eslint-disable-next-line
                "A new service worker has installed, but it can't activate until all tabs running the current version have been unloaded"
              );
            });

            // register the service worker
            wb.register();
          });
        }
      }
    }
  }, []);

  let sections = extractSections(Content);
  let section = sections.find(({ url }) => location.pathname.startsWith(url));
  let pages = extractPages(Content);
  const sidebarPages = _strip(
    section
      ? section.children
      : Content.children.filter(
          (item) => item.type !== 'directory' && item.url !== '/'
        )
  );

  // not to show in sub navbar
  const excludeItems = ['contribute', 'blog', 'r'];

  const title = getPageTitle(Content, location.pathname);

  const description =
    getPageDescription(Content, location.pathname) ||
    'webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.';

  function isPrintPage(url) {
    return url.includes('/printable');
  }

  // As github pages uses trailing slash, we need to provide it to canonicals for consistency
  // between canonical href and final url served by github pages.
  function enforceTrailingSlash(url) {
    return url.replace(/\/?$/, '/');
  }

  // Enable client side redirection
  // See https://github.com/webpack/webpack.js.org/pull/5146#discussion_r663510210
  useEffect(() => {
    const target = clientSideRedirections(location);
    if (target) {
      navigate(target, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="site">
      <Helmet>
        <html lang="en" />
        <meta charset="utf-8" />
        <meta name="theme-color" content="#2B3A42" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {isPrintPage(location.pathname) ? (
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
        <link rel="icon" type="image/x-icon" href={Favicon} />
        {process.env.NODE_ENV === 'production' && (
          <link rel="manifest" href="/manifest.json" />
        )}
        <link
          rel="canonical"
          href={`https://webpack.js.org${enforceTrailingSlash(
            location.pathname
          )}`}
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
      </Helmet>
      <div className="site__header">
        <Navigation
          pathname={location.pathname}
          hash={location.hash}
          toggleSidebar={_toggleSidebar}
          links={[
            {
              content: 'Documentation',
              ariaLabel: 'webpack documentation',
              url: '/concepts/',
              isactive: (_, location) => {
                return /^\/(api|concepts|configuration|guides|loaders|migrate|plugins)/.test(
                  location.pathname
                );
              },
              children: _strip(
                sections.filter(
                  ({ name }) => excludeItems.includes(name) === false
                )
              ),
            },
            {
              content: 'Contribute',
              url: '/contribute/',
              ariaLabel: 'contribute to webpack',
            },
            { content: 'Blog', url: '/blog/', ariaLabel: 'webpack blog' },
          ]}
        />
      </div>

      {isClient ? (
        <SidebarMobile
          isOpen={mobileSidebarOpen}
          sections={_strip(Content.children)}
          toggle={_toggleSidebar}
        />
      ) : null}

      <Routes>
        <Route index element={<Splash />} />
        <Route
          element={
            <Container className="site__content">
              <Outlet />
            </Container>
          }
        >
          <Route path="app-shell" element={<Fragment />} />
          {pages.map((page) => {
            let path = page.path.replace('src/content/', '');
            const { previous, next } = getAdjacentPages(
              sidebarPages,
              page,
              'url'
            );
            return (
              <Route
                key={page.url}
                path={page.url}
                element={
                  <PageElement
                    currentPage={location.pathname}
                    sidebarPages={sidebarPages}
                    page={page}
                    next={next}
                    previous={previous}
                    import={props.import}
                    path={path}
                  />
                }
              />
            );
          })}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Footer />
      <NotificationBar />
    </div>
  );
}
export default Site;
PageElement.propTypes = {
  currentPage: PropTypes.string,
  sidebarPages: PropTypes.array,
  previous: PropTypes.object,
  next: PropTypes.object,
  page: PropTypes.object,
  import: PropTypes.func,
  path: PropTypes.string,
};
function PageElement(props) {
  const { currentPage, sidebarPages, page, previous, next } = props;
  const content = props.import(props.path);
  return (
    <Fragment>
      <Sponsors />
      <Sidebar
        className="site__sidebar"
        currentPage={currentPage}
        pages={sidebarPages}
      />
      <Page {...page} content={content} previous={previous} next={next} />
    </Fragment>
  );
}
