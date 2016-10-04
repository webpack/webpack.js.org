import React from 'react';
import Link from 'react-router/lib/Link';
import { rhythm, scale } from 'utilities/typography';
import { merge, media, presets, style } from 'glamor'
import sections, { basepath } from 'utilities/pages'
import Sticky from 'react-stickynode'

const Sidebar = ({ pages, location, activeSection }) => {
  return (
    <nav
      className="sidebar"
      {...merge({
        display: 'none',
      },
      media(presets.tablet, {
        display: 'block',
        flexBasis: '25%',
        maxWidth: '25%',
        flex: '1',
        paddingRight: rhythm(1),
      }))}
    >
      <Sticky
        top={77}
      >
        <h3
          {...merge({
            marginBottom: rhythm(1/2),
          })}
        >
          {activeSection.toUpperCase()}
        </h3>
        <Item url={ `/${activeSection}/` } title="Introduction" />
        {
          pages.map(({ node }, i) =>
            <Item
              key={ `sidebar-item-${i}` }
              url={ node.path }
              title={ node.frontmatter.title } />
          )
        }
      </Sticky>
    </nav>
  )
};

const Item = ({ url, title }) => (
  <div
    className="sidebar-item"
    style={{
      ...scale(-1/5),
      lineHeight: 1.6,
      marginBottom: rhythm(1/4),
      width: '100%',
    }}
  >
    <Link
      className="sidebar-item__title"
      style={{
        paddingBottom: rhythm(1/4),
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
