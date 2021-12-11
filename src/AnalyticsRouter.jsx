/**
 * based on https://github.com/seeden/react-g-analytics
 * refactored against new version of react/react-router-dom
 */
import { Router, BrowserRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
AnalyticsRouter.propTypes = {
  ...BrowserRouter.propTypes,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  set: PropTypes.object,
};
export default function AnalyticsRouter(props) {
  const { id, set, children } = props;
  const history = useHistory();

  return (
    <Router history={history}>
      <GoogleAnalytics id={id} set={set}>
        {children}
      </GoogleAnalytics>
    </Router>
  );
}

function loadScript() {
  const gads = document.createElement('script');
  gads.async = true;
  gads.type = 'text/javascript';
  gads.src = '//www.google-analytics.com/analytics.js';

  const head = document.getElementsByTagName('head')[0];
  head.appendChild(gads);
}

function initGoogleAnalytics(id, set) {
  if (window.ga || !id) {
    return;
  }

  window.ga =
    window.ga ||
    function () {
      (ga.q = ga.q || []).push(arguments); // eslint-disable-line
    };
  ga.l = +new Date(); // eslint-disable-line

  loadScript();

  window.ga('create', id, 'auto');

  if (set) {
    Object.keys(set).forEach((key) => {
      window.ga('set', key, set[key]);
    });
  }
}
GoogleAnalytics.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  set: PropTypes.object,
};

function googleAnalyticsCommand(what, options, ...args) {
  if (!window.ga) {
    throw new Error('Google analytics is not initialized');
  }

  if (typeof options === 'string') {
    return window.ga(what, options, ...args);
  }

  return window.ga(what, options);
}
function googleAnalyticsSet(...options) {
  return googleAnalyticsCommand('set', ...options);
}
function googleAnalyticsSend(...options) {
  return googleAnalyticsCommand('send', ...options);
}

function GoogleAnalytics(props) {
  const { id, set, children } = props;
  const history = useHistory();

  const [unlisten, setUnlisten] = useState(null);
  const [latestUrl, setLatestUrl] = useState(null);

  useEffect(() => {
    initGoogleAnalytics(id, set);

    const pageview = (location) => {
      const path = location.pathname + location.search;
      if (latestUrl === path) {
        return;
      }

      setLatestUrl(path);

      // user can change the title
      setTimeout(() => {
        googleAnalyticsSet({
          page: path,
          title: document.title,
          location: document.location,
        });

        googleAnalyticsSend({
          hitType: 'pageview',
        });
      }, 0);
    };

    setUnlisten(history.listen(pageview));

    // send current pageview
    pageview(history.location);

    return () => {
      if (unlisten) {
        unlisten();
        setUnlisten(null);
      }
    };
  }, [id, set, history, unlisten, latestUrl]);
  return <>{children}</>;
}
