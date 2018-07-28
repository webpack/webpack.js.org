// Import External Dependencies
import React from 'react';

// Import Components
import Container from '../Container/Container';
import SplashViz from '../SplashViz/SplashViz';
import Markdown from '../Markdown/Markdown';
import Support from '../Support/Support';

// Import helpers
import isClient from '../../utilities/is-client';

// Import Demo Content
import SplashContent from '../../content/index.md';

// Load Styling
import './Splash.scss';

const Splash = () => (
  <div className="splash">
    <SplashViz />

    <div className="splash__section splash__section--dark page__content">
      <Container>
        <Markdown>
          <div dangerouslySetInnerHTML={{
            __html: SplashContent
          }} />
        </Markdown>
      </Container>
    </div>

    <div className="splash__section page__content">
      <Container>
        <Markdown>
          <h1>Support the Team</h1>

          <p>
            Through contributions, donations, and sponsorship, you allow webpack to thrive. Your
            donations directly support office hours, continued enhancements, and most importantly,
            great documentation and learning material!
          </p>

          { isClient ? (
            <React.Fragment>
              <h2>Latest Sponsors</h2>
              <Support rank="latest" />

              <h2>Platinum Sponsors</h2>
              <Support rank="platinum" />

              <h2>Gold Sponsors</h2>
              <Support rank="gold" />

              <h2>Silver Sponsors</h2>
              <Support rank="silver" />

              <h2>Bronze Sponsors</h2>
              <Support rank="bronze" />

              <h2>Backers</h2>
              <Support rank="backer" />
            </React.Fragment>
          ) : null }
        </Markdown>
      </Container>
    </div>
  </div>
);

export default Splash;
