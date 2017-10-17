import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../Container/Container';
import SplashViz from '../SplashViz/SplashViz';
import Support from '../Support/Support';
import './Splash.scss';
import '../SplashViz/SplashViz.scss';
import '../Cube/Cube.scss';
import '../TextRotater/TextRotater.scss';

const Splash = () => (
  <div className="splash">
    <Interactive
      id="src/components/SplashViz/SplashViz.jsx"
      component={ SplashViz } />

    <div className="splash__section splash__section--dark page__content">
      <Container>
        <div dangerouslySetInnerHTML={{
          __html: require('page-loader!../../content/index.md').body
        }} />
      </Container>
    </div>

    <div className="splash__section page__content">
      <Container>
        <h1>支持团队</h1>

        <p>通过你的贡献、捐款或者赞助，webpack 将获得繁荣发展。你的捐助直接用于支持我们付出工作、持续改进，最加重要的是有助于我们提供优秀的文档和资料！</p>

        <h2>近期赞助</h2>
        <Support rank="latest" />

        <h2>平台赞助</h2>
        <Support rank="platinum" />

        <h2>金牌赞助</h2>
        <Support rank="gold" />

        <h2>银牌赞助</h2>
        <Support rank="silver" />

        <h2>铜牌赞助</h2>
        <Support rank="bronze" />

        <h2>赞助者</h2>
        <Support rank="backer" />
      </Container>
    </div>
  </div>
);

Splash.title = 'webpack 中文文档';
Splash.description = 'webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)或包裹(package)任何资源(resource or asset)。';

export default Splash;
