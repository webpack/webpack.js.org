import React from 'react';
import Container from '../container/container';
import Cube from '../cube/cube';
import Link from '../link/link';
import '../../styles';
import './splash-style';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <section className="splash__section splash__sponsor">
        <Container className="splash__content splash_sponsorheadline">
          <h1 id="opencollective-banner" className="splash__sponsorheadline">请支持 webpack！</h1>
          <p>有你的贡献、捐款或者赞助，webpack 将得到大力发展</p>
          <p>你的捐款将直接支持工作和持续改进，最重要的是，这有助于更好的文档和学习资料！</p>

          <object type="image/svg+xml" data="https://opencollective.com/webpack/sponsors.svg"></object>
          <object type="image/svg+xml" data="https://opencollective.com/webpack/backers.svg"></object>
        </Container>
      </section>
      <section className="splash__viz">
        <div className="splash__icon">
          <Cube className="splash__cube" depth={ 150 } />
        </div>

        <span className="splash__headline">
          谁说前端代码不能模块化？
        </span>
      </section>

      <section className="splash__section">
        <Container className="splash__content">
          <h1>{ page.title }</h1>
          <div dangerouslySetInnerHTML={{
            __html: page.content
          }} />
        </Container>
      </section>


    </div>
  );
};
