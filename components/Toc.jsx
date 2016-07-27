import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  displayName: 'Toc',
  render() {
    const sectionPages = this.props.sectionPages;
    const page = this.props.page;

    return (
      <ul className="toc-nav">
        {sectionPages.map((navPage, i) => {
          const type = navPage.type || '';

          return <li key={`navPage${i}`} className={type && 'toc-' + type}>
          {navPage.title === page.title ?
            <span className={`toc-nav__link toc-nav__link--current ${type}`}>
              {navPage.title}
            </span> :
            <Link to={navPage.section ? '/' + navPage.url : navPage.Url} className={`toc-nav__link ${type}`}>
              {navPage.title}
            </Link>
          }
          </li>;
        })}
      </ul>
    );
  }
});
