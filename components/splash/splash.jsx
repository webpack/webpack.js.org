import React from 'react';
import Interactive from 'antwar-interactive';
import Container from '../container/container';
import SplashViz from '../splash-viz/splash-viz';
import './splash-style';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <Interactive
        id="components/splash-viz/splash-viz.jsx"
        component={ SplashViz } />

      <section className="splash__section splash__sponsor">
        <Container className="splash__content splash_sponsorheadline">
          <h1 className="splash__sponsorheadline">Help support webpack!</h1>
          <p>By your contributions, donations, and sponsorship, you allow webpack to thrive.</p>
          
          <object type="image/svg+xml" data="https://opencollective.com/webpack/sponsors.svg"></object>
          <object type="image/svg+xml" data="https://opencollective.com/webpack/backers.svg"></object>
        </Container>
      </section>

      {/*<section className="splash__section">
        <Container className="splash__content">
          <h1>{ page.title }</h1>
          <div dangerouslySetInnerHTML={{ 
            __html: page.content 
          }} />
        </Container>
      </section>*/}       
    </div>
  );
};
