import React from 'react';
import Link from '../link/link';
import Container from '../container/container';
import Icon from '../../assets/icon-square-small.svg';
import CC from '../../assets/cc.svg';
import BY from '../../assets/by.svg';
import './footer-style';

export default (props) => {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <section className="footer__left">
          <Link className="footer__link" to="/guides/getting-started">Get Started</Link>
          <Link className="footer__link" to="/organization">Organization</Link>
          <Link className="footer__link" to="/support">Support</Link>
          <Link className="footer__link" to="/guides/why-webpack#comparison">Comparison</Link>
        </section>

        <section className="footer__middle">
          <Link to="/" className="footer__icon">
            <img src={ Icon } />
          </Link>
        </section>

        <section className="footer__right">
          <Link className="footer__link" to="/glossary">Glossary</Link>
          <Link className="footer__link" to="/branding">Branding</Link>
          <Link className="footer__link" to="//gitter.im/webpack/webpack">Gitter</Link>
          <Link className="footer__link" to="https://github.com/webpack/webpack/releases">Changelog</Link>
          <Link className="footer__link footer__license" to="/license">
            <img
              alt="Creative Commons License"
              src={ CC } />
            <img
              alt="Creative Commons License"
              src={ BY } />
          </Link>
        </section>
      </Container>
    </footer>
  );
};
