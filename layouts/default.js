import React from 'react';
import Navigation from 'components/Navigation';
import Sidecar from 'components/Sidecar';
import Footer from 'components/Footer';
import 'styles/index.scss'
import 'styles/icons.css'
import 'styles/geomanist/stylesheet.css'
import 'prismjs/themes/prism-coy.css'

const pages = [
  { title: 'Concepts', url: 'concepts/' },
  { title: 'Configuration', url: 'configuration/' },
  { title: 'How to', url: 'how-to/' },
  { title: 'API', url: 'api/' },
  { title: 'Github', url: '//github.com/webpack/webpack.js.org' }
];

export default ({ children }) => {
  return (
    <div className="site">
      <Navigation home="/" pages={ pages } />
      <Sidecar />
      { children }
      <Footer />
    </div>
  );
};
