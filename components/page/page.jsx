import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import Sidebar from '../sidebar/sidebar';
import PageLinks from '../page-links/page-links';
import Gitter from '../gitter/gitter';
import Contributors from '../contributors/contributors';
import Sponsors from '../sponsors/sponsors';
import './page-style';
import '../sidebar/sidebar-style';
import '../sponsors/sponsors-style';
import '../gitter/gitter-style';

const Page = ({ page, section }) => {
  const {
    file: {
      attributes: {
        anchors,
        contributors,
        title,
        related,
      },
      body
    },
    url,
  } = page;

  return (
    <Container className="page">
      <Sponsors />
      <Interactive
        id="components/sidebar/sidebar.jsx"
        component={ Sidebar }
        sectionName={ section.name }
        pages={ section.pages().map(page => ({ url, title, anchors })) }
        currentPage={ url } />

      <section className="page__content">
        <h1>{ title }</h1>

        <PageLinks
          page={ page }
          section={ section.name } />

        <div dangerouslySetInnerHTML={{ __html: body }} />

        { related.length > 0 && (
          <div>
            <hr />
            <h3>Further Reading</h3>
            <ul>
              {
                related.map((link, index) => (
                  <li key={ index }>
                    <a href={ link.url }>
                      { link.title }
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
        )}

        { contributors.length > 0 && (
          <div>
            <hr />
            <h3>Contributors</h3>
            <Contributors contributors={ contributors } />
          </div>
        )}

        <Interactive
          id="components/gitter/gitter.jsx"
          component={ Gitter } />
      </section>
    </Container>
  );
};

export default Page;
