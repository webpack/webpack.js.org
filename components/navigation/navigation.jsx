import React from 'react';
import Link from '../link/link';
import Container from '../container/container';
import Logo from '../logo/logo';
import './navigation-style';

export default ({ home = '/', pages, onToggleNav }) => (
  <div className="navigation">
    <Container>
      <div className="navigation__inner">
        <button id="menu-btn" className="navigation__mobilebtn" onClick={onToggleNav}>
          Open navigation
        </button>
        <Link className="navigation__logo" to="/">
          <Logo theme="light" />
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
      </div>
    </Container>
  </div>
);
