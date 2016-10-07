import React from 'react';
import Container from './Container';
import Cube from './Cube';
import Link from './Link';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
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
