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
          <h1 id="opencollective-banner" className="splash__sponsorheadline">Help support webpack!</h1>
          <p>By your contributions, donations, and sponsorship, you allow webpack to thrive.</p>
          <p>Your donations go directly towards supporting office hours, continued enhancements, and most importantly, great documentation and learning material!</p>

          <object type="image/svg+xml" data="https://opencollective.com/webpack/sponsors.svg"></object>
          <object type="image/svg+xml" data="https://opencollective.com/webpack/backers.svg"></object>
        </Container>
      </section>
      <section className="splash__viz">
        <div className="splash__icon">
          <Cube className="splash__cube" depth={ 150 } />
        </div>

        <span className="splash__headline">
          Who said front-end code can't be modular?
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
