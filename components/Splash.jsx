import React from 'react';
import Container from './Container';
import Icon from './Icon';
import Link from './Link';

export default props => {
  let { page } = props;

  return (
    <div className="splash">
      <section className="splash-viz">
        <div className="splash-modules">

        </div>

        <div className="splash-icon">
          <Icon depth={ 150 } />
        </div>

        <div className="splash-output">

        </div>

        <span className="splash-headline">
          webpack transforms your&nbsp;
          <Link to="/concepts/modules">modules</Link>
          &nbsp;into production-ready&nbsp;
          <Link to="/concepts/output">bundles</Link>
          &nbsp;and assets
        </span>
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
