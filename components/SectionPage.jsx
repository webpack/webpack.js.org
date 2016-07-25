import React from 'react';
import Disqus from 'antwar-helpers/components/Disqus';
import PrevNextMini from 'antwar-helpers/components/PrevNextMini';
import Toc from 'antwar-helpers/components/Toc';
import Container from './Container';

export default props => {
  let { section, page, config } = props,
      editUrl = `https://github.com/webpack/webpack.io/tree/master/content/${page.url}.md`;

  return (
    <Container className="section-page">
      <h1 className="section__heading">{ page.title }</h1>

      <a href={ editUrl } className="btn btn-sm" target="_blank">Edit</a>

      <div className="section">
        <div className="section__content">
          <div dangerouslySetInnerHTML={{ __html: page.content }} />

          <div id="disqus_thread" />
        </div>
      </div>

      <div className="toc-nav__wrapper">
        <h2 className="toc-nav--header">{ section.title }</h2>
        <Toc sectionPages={ section.pages() } page={ page } />
      </div>

      <PrevNextMini page={ page } />

      <Disqus shortname="webpack" />
    </Container>
  );
};
