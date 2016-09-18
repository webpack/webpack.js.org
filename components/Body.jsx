import React from 'react';
import Navigation from './Navigation';
import Sidecar from './Sidecar';
import Footer from './Footer';

const pages = [
  { title: 'Concepts', url: 'concepts' },
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
    </div>
  );
};

export default Body;
