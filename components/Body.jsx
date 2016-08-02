import React from 'react';
import { GoogleAnalytics } from 'antwar-helpers';
import Navigation from './Navigation';
import Sidecar from './Sidecar';
import Footer from './Footer';

const pages = [
  { title: 'Concepts', url: 'concepts' },
  { title: 'Configuration', url: 'configuration' },
  { title: 'How to', url: 'how-to' },
  { title: 'API', url: 'api' },
  { title: 'Github', url: '//github.com/webpack/webpack.js.org' }
];

const Body = ({ children }) => {
  return (
    <div>
      <Navigation home="/" pages={ pages } />
      <Sidecar />
      { children }
      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};

export default Body;
