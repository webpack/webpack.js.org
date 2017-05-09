import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import Sidebar from '../sidebar/sidebar';
import PageLinks from '../page-links/page-links';
import Gitter from '../gitter/gitter';
import Contributors from '../contributors/contributors';
import './page-style';
import '../sidebar/sidebar-style';
import '../sponsors/sponsors-style';
import '../gitter/gitter-style';

export default ({ section, page }) => (
  <Container className="page">
    <Interactive
      id="components/sidebar/sidebar.jsx"
      component={ Sidebar }
      sectionName={ section.name }
      pages={ section.pages().map(page => ({
        url: page.url,
        title: page.title,
        anchors: page.anchors
      })) }
      currentPage={ page.url.replace('/index', '') } />

    <section className="page__content">
      <h1>{ page.title }</h1>

      <PageLinks
        page={ page }
        section={ section.name } />

      <div dangerouslySetInnerHTML={{
        __html: page.content
      }} />

      { page.related.length > 0 ? (
        <div>
          <hr />
          <h3>Further Reading</h3>
          <ul>
            {
              page.related.map((string, index) => {
                let link = string.split(' | ');

                if ( link.length !== 2 ) {
                  throw new Error(
                    `Invalid related link: ${string}\r\n` +
                    `Use this format: link title | http://example.com`
                  );
                }

                return (
                  <li key={ index }>
                    <a href={ link[1] }>
                      { link[0] }
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      ) : null }

      { page.contributors.length > 0 ? (
        <div>
          <hr />
          <h3>Contributors</h3>
          <Contributors contributors={ page.contributors } />
        </div>
      ) : null }

      <Interactive
        id="components/gitter/gitter.jsx"
        component={ Gitter } />
    </section>
  </Container>
);
