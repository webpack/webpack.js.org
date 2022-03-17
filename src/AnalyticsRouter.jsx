/**
 * based on https://github.com/seeden/react-g-analytics
 * refactored against new version of react/react-router-dom
 */
import { BrowserRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
AnalyticsRouter.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  set: PropTypes.object,
};
export default function AnalyticsRouter(props) {
  const { id, set, children } = props;

  return (
    <BrowserRouter>
      <GoogleAnalytics id={id} set={set}>
        {children}
      </GoogleAnalytics>
    </BrowserRouter>
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

  const location = useLocation();

  useEffect(() => {
    initGoogleAnalytics(id, set);
  }, [id, set]);

  useEffect(() => {
    const path = location.pathname + location.search;

    googleAnalyticsSet({
      page: path,
      title: document.title,
      location: document.location,
    });

    googleAnalyticsSend({
      hitType: 'pageview',
    });
  }, [location]);

  return <>{children}</>;
}
