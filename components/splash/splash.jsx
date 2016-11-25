import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import SplashViz from '../splash-viz/splash-viz';
import '../../styles';
import './splash-style';
import Support from '../support/support';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <Interactive
        id="components/splash-viz/splash-viz.jsx"
        component={ SplashViz } />

      <Container className="splash__section">
        <h1>{ page.title }</h1>
        <div dangerouslySetInnerHTML={{
          __html: page.content
        }} />
      </Container>

      <Container className="splash__section">
        <h1>请支持团队</h1>

        <p>有你的贡献、捐款或者赞助，webpack 将得到大力发展。你的捐款将直接支持工作和持续改进，最重要的是，这有助于更好的文档和学习资料！</p>

        <h2>Sponsors</h2>
        <Support number={ 20 } type="sponsor" />

        <h2>Backers</h2>
        <Support number={ 100 } type="backer" />
      </Container>
    </div>
  );
};
