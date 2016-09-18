import React from 'react';
import { GoogleAnalytics } from 'antwar-helpers';
import Navigation from './Navigation';
import Sidecar from './Sidecar';
import Footer from './Footer';

const pages = [
  { title: 'Concepts', url: 'concepts' },
  { title: 'How to', url: 'how-to' },
  { title: 'API', url: 'api' },
  { title: 'Github', url: '//github.com/webpack/webpack.js.org' }
];

export default ({ children }) => {
  return (
    <div className="site">
      <Navigation home="/" pages={ pages } />
      <Sidecar />
      { children }
      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};
