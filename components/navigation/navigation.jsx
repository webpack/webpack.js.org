import React from 'react';
import Link from '../link/link';
import Container from '../container/container';
import Logo from '../logo/logo';
import './navigation-style';

export default class Navigation extends React.Component {
  render() {
    let pathname = '';
    let isIndex = false;

    if (typeof window !== 'undefined') {
      pathname = window.location.pathname;
      isIndex = pathname === '' || pathname === '/';
    }

    return (
      <header className="navigation">
        <Container className="navigation__inner">
          <div className="navigation__mobile" onClick={ this._toggleSidebar }>
            <i className="icon-menu" />
          </div>

          <Link className="navigation__logo" to="/">
            <Logo light />
          </Link>

          <nav className="navigation__links">
            {
              this.props.pages.map((link, i) => {
                let active = pathname === `/${link.url}` || pathname.includes(`/${link.url}/`);
                let activeClass = active ? 'navigation__link--active' : '';

                return (
                  <Link
                    key={ `navigation__link${i}` }
                    className={ `navigation__link ${activeClass}` }
                    to={ `/${link.url}` }>
                    { link.title }
                  </Link>
                );
              })
            }
          </nav>
        </Container>
      </header>
    );
  }

  _toggleSidebar(e) {
    let sidebar = document.querySelector('.sidebar-mobile');
    let modifier = 'sidebar-mobile--visible';

    sidebar.classList.toggle(modifier);
  }
}
