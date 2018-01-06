import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom';
import Site from './components/Site/Site';

// TODO: Re-integrate <GoogleAnalytics analyticsId="UA-46921629-2" />
// Consider `react-g-analytics` package

// Client Side Rendering
if ( document !== undefined ) {
  ReactDOM.render((
    <BrowserRouter>
      <Route path="/" component={ Site } />
    </BrowserRouter>
  ), document.getElementById('root'));
}

// Server Side Rendering
// export default locals =>
//   ReactDOMServer.renderToString(
//     <StaticRouter location={locals.path} context={{}}>
//       <Html>
//         {routes}
//       </Html>
//     </StaticRouter>
//   )
