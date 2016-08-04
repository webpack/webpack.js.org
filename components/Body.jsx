import React from 'react';
import Body from 'antwar-helpers/layouts/Body';
import Navigation from './Navigation';
import Footer from './Footer';

const pages = [
  {
    title: 'Concepts',
    url: 'concepts'
  },
  {
    title: 'How to',
    url: 'how-to'
  },
  {
    title: 'API',
    url: 'api'
  }
];

export default props => {
  let { section, location, config } = props,
      { pathname } = location,
      { home = '/' } = config;

  // XXX: drop this once there is root domain
  if (home && __DEV__) { // eslint-disable-line no-undef
    home = '/';
  }

  return (
    <Body { ...props }>
      <Navigation home={ home } pages={ pages } />

      { props.children }

      <Footer />
    </Body>
  );
};
