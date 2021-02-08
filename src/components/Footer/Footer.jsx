import Link from '../Link/Link';
import Container from '../Container/Container';
import Icon from '../../assets/icon-square-small.svg';
import CC from '../../assets/cc.svg';
import BY from '../../assets/by.svg';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <Container className="footer__inner">
      <section className="footer__left">
<<<<<<< HEAD
        <Link className="footer__link" to="/guides/getting-started/">起步</Link>
        <Link className="footer__link" to="/organization/">组织</Link>
        <Link className="footer__link" to="/comparison/">比较</Link>
=======
        <Link className="footer__link" to="/guides/getting-started/">
          Get Started
        </Link>
        <Link className="footer__link" to="/organization/">
          Organization
        </Link>
        <Link className="footer__link" to="/comparison/">
          Comparison
        </Link>
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
      </section>

      <section className="footer__middle">
        <Link to="/" className="footer__icon">
          <img src={Icon} alt="webpack icon" />
        </Link>
      </section>

      <section className="footer__right">
<<<<<<< HEAD
        <Link className="footer__link" to="https://webpack.threadless.com/">商店</Link>
        <Link className="footer__link" to="/glossary/">概念术语</Link>
        <Link className="footer__link" to="/branding/">品牌</Link>
        <Link className="footer__link" to="https://gitter.im/webpack/webpack">Gitter</Link>
        <Link className="footer__link" to="https://github.com/webpack/webpack/releases">更新日志</Link>
=======
        <Link className="footer__link" to="https://webpack.threadless.com/">
          Swag Store
        </Link>
        <Link className="footer__link" to="/glossary/">
          Glossary
        </Link>
        <Link className="footer__link" to="/branding/">
          Branding
        </Link>
        <Link className="footer__link" to="https://gitter.im/webpack/webpack">
          Gitter
        </Link>
        <Link
          className="footer__link"
          to="https://github.com/webpack/webpack/releases"
        >
          Changelog
        </Link>
>>>>>>> 2a79b6b70d9af5bbff0bb3f044dcb2d575090ce5
        <Link className="footer__link footer__license" to="/license">
          <img alt="Creative Commons License" src={CC} />
          <img alt="Creative Commons License" src={BY} />
        </Link>
      </section>
    </Container>
  </footer>
);

export default Footer;
