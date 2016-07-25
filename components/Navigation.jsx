import React from 'react';
import { Link } from 'react-router';
import Container from './Container';
import Logo from './Logo';

export default ({ home = '/', theme = '', pages }) => (
  <div className={`navigation ${ theme }`}>
    <Container className="navigation-inner">
      <Link className="navigation-logo" to={{ pathname: home }}>
        <Logo theme={ theme === 'light' ? 'dark' : 'light' } />
      </Link>

      <nav className="navigation-nav">{ pages.map((link, i) => (
        <Link
          key={ `link-${i}` }
          className="navigation-nav-link"
          activeClassName="-active"
          to={ link.url }>
          { link.title }
        </Link>
      )) }</nav>
    </Container>
  </div>
);
