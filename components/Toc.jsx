import React from 'react';
import {Link} from 'react-router';

const Toc = ({ sectionPages, page }) => (
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

export default Toc;
