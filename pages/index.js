import React from 'react';
import Container from 'components/Container';
import Cube from 'components/Cube';
import Link from 'components/Link';

export default props => {
  return (
    <div className="splash">
      <section className="splash__viz">
        <div className="splash__modules">

        </div>

        <div className="splash__icon">
          <Cube className="splash__cube" depth={ 150 } />
        </div>

        <div className="splash__output">

        </div>

        <span className="splash__headline">
          webpack transforms your&nbsp;
          <Link to="/concepts/modules/">modules</Link>
          &nbsp;into production-ready&nbsp;
          <Link to="/concepts/output/">bundles</Link>
          &nbsp;and assets
        </span>
      </section>

      <section className="splash__section">
        <Container className="splash__content">
          <h1>Webpack</h1>
          <div>
            Still debating what to do with this section
          </div>
        </Container>
      </section>
    </div>
  );
};

export const pageQuery = `
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
