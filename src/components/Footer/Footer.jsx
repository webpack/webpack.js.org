import BY from "../../assets/by.svg";
import CC from "../../assets/cc.svg";
import Icon from "../../assets/icon-square-small.svg";
import OpenJSLogo from "../../assets/openjs-logo.png";
import Container from "../Container/Container.jsx";
import Link from "../Link/Link.jsx";

const footerLinkClasses =
  "text-[11px] uppercase text-[#777676] hover:text-[#333333]";

const Footer = () => (
  <footer className="w-full flex-[0_0_auto] print:hidden">
    <Container className="mx-auto max-w-[900px] px-5 pb-[30px] pt-[40px] text-center [&_a]:text-[#3b7eb5]">
      <div className="mb-[24px] flex justify-center">
        <a href="https://openjsf.org" target="_blank" rel="noopener noreferrer">
          <img
            className="h-[40px] w-auto"
            src={OpenJSLogo}
            alt="OpenJS Foundation Logo"
          />
        </a>
      </div>
      <p className="mx-auto text-[15px] leading-[1.6] text-[#333333]">
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
      <p className="mx-auto mt-[18px] text-[15px] leading-[1.6] text-[#333333]">
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
    <Container className="flex flex-wrap justify-center gap-y-4 content-center border-t border-[#f2f2f2] px-0 py-[0.4em] md:flex-row md:justify-between">
      <section
        className="mx-auto flex max-w-full flex-[0_0_auto] flex-wrap items-center justify-center py-[0.25em] md:m-0 md:justify-start md:pl-[1.5em] md:py-0 [&>*:not(:last-child)]:mr-[1.5em]"
        aria-label="Quick links"
      >
        <Link className={footerLinkClasses} to="/guides/getting-started/">
          Get Started
        </Link>
        <Link className={footerLinkClasses} to="/comparison/">
          Comparison
        </Link>
        <Link
          className={footerLinkClasses}
          to="https://privacy-policy.openjsf.org/"
        >
          Privacy Policy
        </Link>
      </section>

      <section className="hidden md:block md:flex-[0_0_auto]" aria-label="Home">
        <Link to="/" className="inline-block h-[35px]">
          <img
            className="inline-block h-full w-auto"
            src={Icon}
            alt="webpack icon"
            width={35}
            height={35}
          />
        </Link>
      </section>

      <section
        className="mx-auto flex max-w-full flex-[0_0_auto] flex-wrap items-center justify-center py-[0.25em] md:m-0 md:justify-end md:py-0 md:pr-[1.5em] [&>a:not(:last-child)]:mr-[1.5em]"
        aria-label="Resources and links"
      >
        <Link
          className={footerLinkClasses}
          to="https://webpack.threadless.com/"
        >
          Swag Store
        </Link>
        <Link className={footerLinkClasses} to="/awesome-webpack/">
          Awesome webpack
        </Link>
        <Link className={footerLinkClasses} to="/glossary/">
          Glossary
        </Link>
        <Link className={footerLinkClasses} to="/branding/">
          Branding
        </Link>
        <Link
          className={footerLinkClasses}
          to="https://github.com/webpack/webpack/releases"
        >
          Changelog
        </Link>
        <Link
          className="inline-block h-[25px] align-middle [&_img]:ml-4 [&_img]:inline-block [&_img]:h-full [&_img]:w-auto"
          to="/license"
        >
          <img
            alt="Creative Commons License (CC)"
            src={CC}
            width={25}
            height={25}
          />
          <img
            alt="Creative Commons Attribution (CC BY)"
            src={BY}
            width={25}
            height={25}
          />
        </Link>
      </section>
    </Container>
  </footer>
);

export default Footer;
