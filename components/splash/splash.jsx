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
        <h1>Support the Team</h1>

        <p>Through contributions, donations, and sponsorship, you allow webpack to thrive. Your donations directly support office hours, continued enhancements, and most importantly, great documentation and learning material!</p>

        <h2>Sponsors</h2>
        <Support number={ 20 } type="sponsor" />

        <h2>Backers</h2>
        <Support number={ 100 } type="backer" />
      </Container>
    </div>
  );
};
