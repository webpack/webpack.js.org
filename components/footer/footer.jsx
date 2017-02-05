import React from 'react';
import CC from '../cc/cc';
import Link from '../link/link';
import Container from '../container/container';
import Icon from '../../assets/icon-square-small.svg';
import './footer-style';

export default (props) => {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <section className="footer__left">
          <Link className="footer__link" to="/guides/get-started">Get Started</Link>
          <Link className="footer__link" to="/organization">Organization</Link>
          <Link className="footer__link" to="/contribute">Contribute</Link>
          <Link className="footer__link" to="/guides/why-webpack#comparison">Comparison</Link>
        </section>

        <section className="footer__middle">
          <Link to="/" className="footer__icon">
            <img src={ Icon } />
          </Link>
        </section>

        <section className="footer__right">
          <Link className="footer__link" to="/branding">Branding</Link>
          <Link className="footer__link" to="//gitter.im/webpack/webpack">Support</Link>
          <Link className="footer__link" to="https://github.com/webpack/webpack/releases">Changelog</Link>
          <Link className="footer__link" to="/license">License</Link>
          <CC />
        </section>
      </Container>
    </footer>
  );
};
