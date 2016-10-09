import React from 'react';
import Link from '../link/link';
import Cube from '../cube/cube';
import Container from '../container/container';
import './footer-style';

export default (props) => {
  return (
    <div className="footer">
      <Container className="footer__inner">
        <section className="footer__left">
          <Link className="footer__link" to="/get-started">Get Started</Link>
          <Link className="footer__link" to="/analyze">Analyze</Link>
          <Link className="footer__link" to="/contribute">Contribute</Link>
        </section>

        <section className="footer__middle">
          <Link to="/">
            <Cube depth={ 18 } hover />
          </Link>
        </section>

        <section className="footer__right">
          <Link className="footer__link" to="//gitter.im/webpack/webpack">Support</Link>
          <Link className="footer__link" to="https://github.com/webpack/webpack/releases">Changelog</Link>
          <Link className="footer__link" to="/license">License</Link>
        </section>
      </Container>
    </div>
  );
};
