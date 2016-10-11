import React from 'react';
import Headroom from 'react-headroom';
import Link from '../link/link';
import Container from '../container/container';
import LogoImg from './logo.png';
import './navigation-style';

export default ({ home = '/', pages, onToggleNav }) => (
  <Headroom className="navigation">
    <Container className="navigation__inner">
      <button id="menu-btn" className="navigation__mobilebtn" onClick={onToggleNav}>
        Open navigation
      </button>

      <Link className="navigation__logo" to="/">
        <img src={ LogoImg } />
      </Link>

      <nav className="navigation__links">
        {
          pages.map((link, i) => (
            <Link
              key={ `navigation__link${i}` }
              className="navigation__link"
              activeClassName="navigation__link--active"
              to={ `/${link.url}` }>
              { link.title }
            </Link>
          ))
        }
      </nav>
    </Container>
  </Headroom>
);
