import React from 'react';
import Link from 'react-router/lib/Link';
import { rhythm, scale, options } from 'utilities/typography';

const Sidebar = ({ pathname, pages }) => {
  const splitPathname = pathname.split('/')
  const base = splitPathname[1]
  const sectionPages = pages.filter((page) => {
    return base === page.node.path.split('/')[1] &&
      // This is the index page, since we always add it as "introduction"
      // filter it out here.
      page.node.path !== `/${base}/`
  })

  return (
    <nav
      className="sidebar"
      style={{
        padding: rhythm(1),
      }}
    >
      <Item url={ `/${base}/` } title="Introduction" />
      {
        sectionPages.map(({ node }, i) =>
          <Item
            key={ `sidebar-item-${i}` }
            url={ node.path }
            title={ node.frontmatter.title } />
        )
      }
    </nav>
  )
};

const Item = ({ url, title }) => (
  <div
    className="sidebar-item"
    style={{
      ...scale(-1/5),
      marginBottom: rhythm(1/4),
      width: '100%',
    }}
  >
    <Link
      className="sidebar-item__title"
      style={{
        padding: rhythm(1/4),
      }}
      activeStyle={{
        color: 'black',
        fontWeight: 'bold',
      }}
      to={ url }
    >
      { title }
    </Link>
    <i className="sidebar-item__toggle icon-chevron-down" />
    <ul className="sidebar-item__sections">
      {/*
        page.sections.map((section, j) => (
          <li className="sidebar-item-section"
              key={ `sidebar-item-${i}-section-${j}` }>
            <Link to={ `/${page.url}#${section.id}` }>{ section.title }</Link>
          </li>
        )) : ''
      */}
    </ul>
  </div>
);

export default Sidebar;
