// Import External Dependencies
import { Fragment, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { useTransition, animated, config } from 'react-spring';

// Import Utilities
import {
  extractPages,
  extractSections,
  getPageTitle,
} from '../../utilities/content-utils';
import isClient from '../../utilities/is-client';
import getAdjacentPages from '../../utilities/get-adjacent-pages';

// Import Components
import Navigation from '../Navigation/Navigation';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Container from '../Container/Container';
import Splash from '../Splash/Splash';
import Sponsors from '../Sponsors/Sponsors';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import Page from '../Page/Page';
import PageNotFound from '../PageNotFound/PageNotFound';
import Vote from '../Vote/Vote';
import Organization from '../Organization/Organization';
import Badge from '../Badge/Badge.js';
import { default as LinkComponent } from '../mdxComponents/Link';

// Load Styling
import '../../styles/index';
import './Site.scss';

// Load Content Tree
import Content from '../../_content.json';
import NotifyBox from '../NotifyBox/NotifyBox';

Site.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  import: PropTypes.func,
};
function Site(props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [list, setList] = useState([]);
  const [wb, setWb] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [NotificationBar, setNotificationBar] = useState(undefined);
  const [barLoaded, setBarLoaded] = useState(false);

  const listTransitions = useTransition(list, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(50%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    keys: list.map((item, index) => index),
  });
  const skip = () => {
    if (!wb) return;
    setLoading(true);
    wb.messageSkipWaiting();
  };
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
      (item) => item.name.toLowerCase() === 'index.md'
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
          page.title !== 'printable.md' && !page.content.includes('Printable')
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
    import(
      '../NotificationBar/NotificationBar'
    ).then(({default: NotificationBar}) => {
      // we are storing a component, not passing an updater function
      setNotificationBar(() => NotificationBar);
      setBarLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isClient) {
      if (process.env.NODE_ENV === 'production') {
        // only register sw.js in production
        if ('serviceWorker' in navigator) {
          // dynamic load sw
          import('workbox-window/Workbox.mjs').then(({ Workbox }) => {
            const wb = new Workbox('/sw.js');
            setWb(wb);

            // listen to `waiting` event
            wb.addEventListener('waiting', () => {
              // log and show updateBox
              console.log(
                // eslint-disable-next-line
                "A new service worker has installed, but it can't activate until all tabs running the current version have been unloaded"
              );
              setList([true]);
            });

            // register the service worker
            wb.register();
          });
        }
      }
    }
  }, []);

  let { location } = props;
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
  return (
    <MDXProvider
      components={{
        Badge: Badge,
        a: LinkComponent,
      }}
    >
      <div className="site">
        <DocumentTitle title={getPageTitle(Content, location.pathname)} />
        <div className="site__header">
          {
            barLoaded === true ? <NotificationBar /> : undefined
          }
          <Navigation
            pathname={location.pathname}
            toggleSidebar={_toggleSidebar}
            links={[
              {
                content: 'Documentation',
                url: '/concepts/',
                isActive: (url) =>
                  /^\/(api|concepts|configuration|guides|loaders|migrate|plugins)/.test(
                    url
                  ),
                children: _strip(
                  sections.filter((item) => item.name !== 'contribute')
                ),
              },
              { content: 'Contribute', url: '/contribute/' },
              { content: 'Vote', url: '/vote/' },
              { content: 'Blog', url: '/blog/' },
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

        <Switch>
          <Route
            exact
            strict
            path="/:url*"
            render={(props) => <Redirect to={`${props.location.pathname}/`} />}
          />
          <Route path="/" exact component={Splash} />
          <Route
            render={() => (
              <Container className="site__content">
                <Switch>
                  <Route path="/vote" component={Vote} />
                  <Route path="/organization" component={Organization} />
                  <Route path="/app-shell" component={() => <Fragment />} />
                  {pages.map((page) => (
                    <Route
                      key={page.url}
                      exact={true}
                      path={page.url}
                      render={() => {
                        let path = page.path.replace('src/content/', '');
                        let content = props.import(path);
                        const { previous, next } = getAdjacentPages(
                          sidebarPages,
                          page,
                          'url'
                        );
                        return (
                          <Fragment>
                            <Sponsors />
                            <Sidebar
                              className="site__sidebar"
                              currentPage={location.pathname}
                              pages={sidebarPages}
                            />
                            <Page
                              {...page}
                              content={content}
                              previous={previous}
                              next={next}
                            />
                          </Fragment>
                        );
                      }}
                    />
                  ))}
                  <Route render={() => <PageNotFound />} />
                </Switch>
              </Container>
            )}
          />
        </Switch>
        <Footer />
        {listTransitions((styles) => (
          <animated.div style={styles} className="notifyBox">
            <NotifyBox skip={skip} loading={loading} />
          </animated.div>
        ))}
      </div>
    </MDXProvider>
  );
}

export default Site;
