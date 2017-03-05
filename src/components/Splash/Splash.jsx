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
      id="components/splash-viz/splash-viz.jsx"
      component={ SplashViz } />

    <div className="splash__section splash__section--dark">
      <Container>
        <div dangerouslySetInnerHTML={{
          __html: require('page-loader!./index.md').body
        }} />
      </Container>
    </div>

    <div className="splash__section">
      <Container>
        <h1>Support the Team</h1>

        <p>Through contributions, donations, and sponsorship, you allow webpack to thrive. Your donations directly support office hours, continued enhancements, and most importantly, great documentation and learning material!</p>

        <h2>Platinum Sponsors</h2>
        <Support type="sponsors" rank="platinum" />

        <h2>Gold Sponsors</h2>
        <Support type="sponsors" rank="gold" />

        <h2>Silver Sponsors</h2>
        <Support type="sponsors" rank="silver" />

        <h2>Bronze Sponsors</h2>
        <Support type="sponsors" rank="bronze" />

        <h2>Backers</h2>
        <Support type="backers" />
      </Container>
    </div>
  </div>
);

export default Splash;
