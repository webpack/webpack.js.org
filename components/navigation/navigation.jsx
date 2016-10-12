import React from 'react';
import Headroom from 'react-headroom';
import Link from '../link/link';
import Container from '../container/container';
import LogoImg from './logo.png';
import './navigation-style';

export default class Navigation extends React.Component {
  render() {
    return (
      <Headroom className="navigation">
        <Container className="navigation__inner">
          <div className="navigation__mobile" onClick={ this._toggleSidebar }>
            <i className="icon-menu" />
          </div>

          <Link className="navigation__logo" to="/">
            <img src={ LogoImg } />
          </Link>

          <nav className="navigation__links">
            {
              this.props.pages.map((link, i) => (
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
  }

  _toggleSidebar(e) {
    let sidebar = document.querySelector('.sidebar');
    let modifier = 'sidebar--visible';

    sidebar.classList.toggle(modifier);
  }
}
