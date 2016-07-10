import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'Navigation',
  render() {
    const pages = this.props.pages;

    return (
      <div className="nav__wrapper">
        <input type="checkbox" className="nav__toggle" id="nav__toggle" />
        <label className="nav__toggle-label" htmlFor="nav__toggle" />
        <nav className="nav">{pages.map((link, i) => {
          return (
            <div key={`link-${i}`} className="nav__link">
              <Link to={link.url}>{link.title}</Link>
            </div>
          );
        })}</nav>
      </div>
    );
  }
});
