import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import SplashViz from '../splash-viz/splash-viz';
import Support from '../support/support';
import './splash-style';
import '../splash-viz/splash-viz-style';
import '../cube/cube-style';
import '../text-rotater/text-rotater-style.scss';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <Interactive
        id="components/splash-viz/splash-viz.jsx"
        component={ SplashViz } />

      <div className="splash__section splash__section--dark">
        <Container>
          <div dangerouslySetInnerHTML={{
            __html: page.content
          }} />
        </Container>
      </div>

      <div className="splash__section">
        <Container>
          <h1>支援團隊</h1>

          <p>通過您的貢獻、捐款或者贊助，webpack 將獲得繁榮發展。你的捐助直接用於支持我們付出工作、持續改進，最加重要的是有助於我們提供優秀的文件和資料！</p>

          <h2>贊助商</h2>
          <Support number={ 40 } type="sponsor" />

          <h2>支持者</h2>
          <Support number={ 130 } type="backer" />
        </Container>
      </div>
    </div>
  );
};
