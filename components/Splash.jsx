import React from 'react';
import Container from './Container';
import Icon from './Icon';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <section className="splash-viz">
        <div className="splash-viz-modules">

        </div>

        <div className="splash-viz-icon">
          <Icon depth={ 150 } />
        </div>

        <div className="splash-viz-output">

        </div>
      </section>

      <section className="splash-content">
        <Container className="splash-content-inner">
          <h1>{ page.title }</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Container>
      </section>
    </div>
  );
};
