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

export default ({ section, page }) => {
  return (
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

        { page.contributors.length > 0 ? (
          <div>
            <hr />
            <h3>贡献人员</h3>
            <Contributors contributors={ page.contributors } />
          </div>
        ) : null }

        <Interactive
          id="components/gitter/gitter.jsx"
          component={ Gitter } />
      </section>
    </Container>
  );
};
