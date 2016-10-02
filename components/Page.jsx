import React from 'react';
import Container from './Container';
import Sidebar from './Sidebar';
import Contributors from './Contributors';

export default props => {
  let { config, section, page } = props;

  let edit = `https://github.com/webpack/webpack.js.org/edit/master/content/${page.url}.md`;

  return (
    <Container className="page">
      <Sidebar paths={config.paths} sectionName={section.name} pages={ section.pages() } />
      <section className="page__content">
        <h1>{ page.title }</h1>

        <a className="page__edit" href={ edit }>
          Edit this Page&nbsp;&nbsp;
          <i className="icon-edit" />
        </a>

        <div dangerouslySetInnerHTML={{ __html: page.content }} />

        <hr />

        <Contributors contributors={ page.contributors } />
      </section>
    </Container>
  );
};
