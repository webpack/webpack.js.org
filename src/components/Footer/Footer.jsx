import BY from "../../assets/by.svg";
import CC from "../../assets/cc.svg";
import Icon from "../../assets/icon-square-small.svg";
import OpenJSLogo from "../../assets/openjs-logo.png";
import Container from "../Container/Container.jsx";
import Link from "../Link/Link.jsx";
import "./Footer.scss";

const Footer = () => (
  <footer className="footer">
    <Container className="footer__top">
      <div className="footer__openjs">
        <a href="https://openjsf.org" target="_blank" rel="noopener noreferrer">
          <img src={OpenJSLogo} alt="OpenJS Foundation Logo" width={110} />
        </a>
      </div>
      <p>
        Copyright <a href="https://openjsf.org">OpenJS Foundation</a> and
        webpack contributors. All rights reserved. The{" "}
        <a href="https://openjsf.org">OpenJS Foundation</a> has registered
        trademarks and uses trademarks. For a list of trademarks of the{" "}
        <a href="https://openjsf.org">OpenJS Foundation</a>, please see our{" "}
        <a href="https://trademark-policy.openjsf.org">Trademark Policy</a> and{" "}
        <a href="https://trademark-list.openjsf.org">Trademark List</a>.
        Trademarks and logos not indicated on the{" "}
        <a href="https://trademark-list.openjsf.org">
          list of OpenJS Foundation trademarks
        </a>{" "}
        are trademarks&trade; or registered&reg; trademarks of their respective
        holders. Use of them does not imply any affiliation with or endorsement
        by them.
      </p>
      <p>
        <a href="https://openjsf.org">The OpenJS Foundation</a> |{" "}
        <a href="https://terms-of-use.openjsf.org">Terms of Use</a> |{" "}
        <a href="https://privacy-policy.openjsf.org">Privacy Policy</a> |{" "}
        <a href="https://bylaws.openjsf.org">Bylaws</a> |{" "}
        <a href="https://code-of-conduct.openjsf.org">Code of Conduct</a> |{" "}
        <a href="https://trademark-policy.openjsf.org">Trademark Policy</a> |{" "}
        <a href="https://trademark-list.openjsf.org">Trademark List</a> |{" "}
        <a href="https://www.linuxfoundation.org/cookies">Cookie Policy</a>
      </p>
    </Container>
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
        <Link
          className="footer__link"
          to="https://discord.com/invite/5sxFZPdx2k"
        >
          Discord
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
