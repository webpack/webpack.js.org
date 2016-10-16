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

      <iframe 
        className="splash__bin"
        src="http://www.webpackbin.com/N1XOoynAZ"
        sandbox="allow-scripts allow-same-origin allow-forms" />


      <section className="splash__section splash__sponsor">
        <Container className="splash__content">
          <h1>Support the Team!</h1>

          <p>Through contributions, donations, and sponsorship, you allow webpack to thrive. Your donations directly support office hours, continued enhancements, and most importantly, great documentation and learning material!</p>
          
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
