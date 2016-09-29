import React from 'react';
import Link from './Link';
import Cube from './Cube';
import Container from './Container';

export default props => {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <section className="footer__left">
          <Link className="footer__link" to="/get-started">Get Started</Link>
          <Link className="footer__link" to="/analyze">Analyze</Link>
          <Link className="footer__link" to="/contribute">Contribute</Link>
        </section>

        <section className="footer__middle">
          <Link to={{ pathname: '/' }}>
            <Cube depth={ 18 } hover />
          </Link>
        </section>

        <section className="footer__right">
          <Link className="footer__link" to="//gitter.im/webpack/webpack">Support</Link>
          <Link className="footer__link" to="/changelog">Changelog</Link>
          <Link className="footer__link" to="/license">License</Link>
        </section>
      </Container>
    </footer>
  );
};
