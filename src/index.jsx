// Import External Dependencies
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { BrowserRouter as AnalyticsRouter } from 'react-g-analytics';
import {MDXProvider} from '@mdx-js/react';

// Import Components
import Site from './components/Site/Site';
import Badge from './components/Badge/Badge.js';

// Import helpers
import isClient from './utilities/is-client';

const isProduction = process.env.NODE_ENV === 'production';

const Router = isProduction ? AnalyticsRouter : BrowserRouter;
const render = isProduction ? ReactDOM.hydrate : ReactDOM.render;

// Client Side Rendering
if (isClient) {
  render((
    <MDXProvider components={{
      Badge: function Comp (props) {
        return <Badge {...props} />;
      }
    }}>
      <Router id="UA-46921629-2">
      <Route
        path="/"
        render={ props => (
          <Site
            { ...props }
            import={ path => import(`./content/${path}`) } />
        )} />
    </Router>
    </MDXProvider>
  ), document.getElementById('root'));
}
