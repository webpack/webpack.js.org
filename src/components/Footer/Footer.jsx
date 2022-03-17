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
        <Link className="footer__link" to="/guides/getting-started/">
          Get Started
        </Link>
        <Link className="footer__link" to="/comparison/">
          Comparison
        </Link>
        <Link className="footer__link" to="https://privacy-policy.openjsf.org/">
          Privacy Policy
        </Link>
      </section>

      <section className="footer__middle">
        <Link to="/" className="footer__icon">
          <img src={Icon} alt="webpack icon" width={35} height={35} />
        </Link>
      </section>

      <section className="footer__right">
        <Link className="footer__link" to="https://webpack.threadless.com/">
          Swag Store
        </Link>
        <Link className="footer__link" to="/awesome-webpack/">
          Awesome webpack
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
        <Link className="footer__link footer__license" to="/license">
          <img alt="Creative Commons License" src={CC} width={25} height={25} />
          <img alt="Creative Commons License" src={BY} width={25} height={25} />
        </Link>
      </section>
    </Container>
  </footer>
);

export default Footer;
