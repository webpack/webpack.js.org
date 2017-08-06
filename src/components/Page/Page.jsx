import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../Container/Container';
import Sidebar from '../Sidebar/Sidebar';
import PageLinks from '../PageLinks/PageLinks';
import Gitter from '../Gitter/Gitter';
import Contributors from '../Contributors/Contributors';
import Sponsors from '../Sponsors/Sponsors';
import './Page.scss';
import '../Sidebar/Sidebar.scss';
import '../Sponsors/Sponsors.scss';
import '../Gitter/Gitter.scss';

export default ({ section, page }) => (
  <Container className="page">

    <Sponsors />

    <Interactive
      id="src/components/Sidebar/Sidebar.jsx"
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
              page.related.map((link, index) => (
                <li key={ index }>
                  <a href={ link.url }>
                    { link.title }
                  </a>
                </li>
              ))
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
        id="src/components/Gitter/Gitter.jsx"
        component={ Gitter } />
    </section>
  </Container>
);
