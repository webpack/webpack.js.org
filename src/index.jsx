import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-g-analytics';
import Site from './components/Site/Site';

let gaID;

if(process.env.NODE_ENV === 'production') {
  gaID = 'UA-46921629-2';
}

// Client Side Rendering
if ( window.document !== undefined ) {
  ReactDOM.render((
    <BrowserRouter id={gaID}>
      <Route
        path="/"
        render={ props => (
          <Site
            { ...props }
            import={ path => import(`./content/${path}`) } />
        )} />
    </BrowserRouter>
  ), document.getElementById('root'));
}
