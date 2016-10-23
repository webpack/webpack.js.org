import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import Sidebar from '../sidebar/sidebar';
import Contributors from '../contributors/contributors';
import '../../styles';
import './page-style';

export default ({ section, page }) => {
  let edit = `https://github.com/vuefe/webpack.js.org/edit/develop/content/${page.url}.md`;

  return (
    <Container className="page">
      <Interactive
        id="components/sidebar/sidebar.jsx"
        component={Sidebar}
        sectionName={section.name}
        pages={section.pages().map(page => ({
          url: page.url,
          title: page.title,
          anchors: page.anchors
        }))}
      />

      <section className="page__content">
        <h1>{ page.title }</h1>

        <a className="page__edit" href={ edit }>
          编辑此页&nbsp;&nbsp;
          <i className="icon-edit" />
        </a>

        <div dangerouslySetInnerHTML={{ __html: page.content }} />

        <hr />

        <Contributors contributors={ page.contributors } />
      </section>
    </Container>
  );
};
