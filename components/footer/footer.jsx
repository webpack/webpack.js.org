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
          <Link className="footer__link" to="/guides/getting-started">起步</Link>
          <Link className="footer__link" to="/organization">组织</Link>
          <Link className="footer__link" to="/contribute">支持</Link>
          <Link className="footer__link" to="/guides/why-webpack#comparison">比较</Link>
        </section>

        <section className="footer__middle">
          <Link to="/" className="footer__icon">
            <img src={ Icon } alt="webpack icon"/>
          </Link>
        </section>

        <section className="footer__right">
          <Link className="footer__link" to="/glossary">概念术语</Link>
          <Link className="footer__link" to="/branding">品牌</Link>
          <Link className="footer__link" to="//gitter.im/webpack/webpack">Gitter</Link>
          <Link className="footer__link" to="https://github.com/webpack/webpack/releases">更新日志</Link>
          <Link className="footer__link" to="/license">遵循协议</Link>
          <Link className="footer__link">粤ICP备17008907号</Link>
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
