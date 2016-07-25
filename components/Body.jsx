import React from 'react';
import Fork from 'react-ghfork';
import Body from 'antwar-helpers/layouts/Body';
import Gitter from 'antwar-helpers/components/Gitter';
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

  return (
    <Body { ...props }>
      <Navigation home={ home } pages={ pages } />

      { props.children }

      <Footer />

      <Fork className="right ribbon"
        project="webpack/webpack"
        text="Fork me on GitHub"
        style={{ backgroundColor: 'black' }}
        target="_blank" />

      <Gitter room={ 'webpack/webpack' } title="Need help?" />
    </Body>
  );
};
