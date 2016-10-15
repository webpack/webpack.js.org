import React from 'react';
import Interactive from 'antwar-interactive';
import { GoogleAnalytics } from 'antwar-helpers';
import Navigation from '../navigation/navigation';
import Sidecar from '../sidecar/sidecar';
import Footer from '../footer/footer';
import './site-style';

const pages = [
  { title: 'Concepts', url: 'concepts' },
  { title: 'Configuration', url: 'configuration' },
  { title: 'How to', url: 'how-to' },
  { title: 'API', url: 'api' },
  { title: 'Donate', url: '//opencollective.com/webpack'}
];

export default props => {
  let { children } = props;

  return (
    <div id="site" className="site">
      <Interactive
        id="components/navigation/navigation.jsx"
        component={ Navigation }
        pages={ pages } />

      <Sidecar />
      { props.children }
      <Footer />

      <GoogleAnalytics analyticsId="UA-46921629-2" />
    </div>
  );
};
