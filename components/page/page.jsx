import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import Sidebar from '../sidebar/sidebar';
import Sidecar from '../sidecar/sidecar';
import Contributors from '../contributors/contributors';
import './page-style';
import '../sidebar/sidebar-style';

export default ({ section, page }) => {
  let edit = `https://github.com/vuefe/webpack2/edit/cn/content/${page.url}.md`;

  return (
    <Container className="page">
      <Sidecar />
      <Interactive
        id="components/sidebar/sidebar.jsx"
        component={Sidebar}
        sectionName={section.name}
        pages={section.pages().map(page => ({
          url: page.url,
          title: page.title,
          anchors: page.anchors
        }))}
        currentPage={ page.url.replace("/index", "") }
      />

      <section className="page__content">
        <h1>{ page.title }</h1>

        <a className="page__edit" href={ edit }>
          编辑此页
          &nbsp;&nbsp;
          <i className="icon-edit" />
        </a>

        <div dangerouslySetInnerHTML={{ __html: page.content }} />


        <hr style={{ display: page.contributors.length ? 'block' : 'none' }} />
        <h3 style={{ display: page.contributors.length ? 'block' : 'none' }}>Contributors</h3>
        <Contributors contributors={ page.contributors } />
      </section>
    </Container>
  );
};
