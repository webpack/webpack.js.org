import React from 'react';
import Link from './Link';
import Container from './Container';
import Sidebar from './Sidebar';
import Contributors from './Contributors';

export default props => {
  let { section, page } = props,
      edit = `https://github.com/webpack/webpack.js.org/edit/master/content/${page.url}.md`;

  return (
    <Container className="page">
      <Sidebar sectionName={section.name} pages={ section.pages() } />
      <section className="page-content">
        <h1>{ page.title }</h1>

        <a className="page-edit" href={ edit }>
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
