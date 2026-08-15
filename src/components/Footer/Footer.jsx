import BY from "../../assets/by.svg";
import CC from "../../assets/cc.svg";
import Icon from "../../assets/icon-square-small.svg";
import OpenJSLogo from "../../assets/openjs-logo.png";
import Container from "../Container/Container.jsx";
import Link from "../Link/Link.jsx";

const footerLinkClasses =
  "text-[11px] uppercase text-[#777676] dark:text-[#cccccc] hover:text-[#333333] dark:hover:text-[#ffffff]";

const Footer = () => (
  <footer className="w-full flex-[0_0_auto] print:hidden">
    <Container className="mx-auto max-w-[900px] px-5 pb-[30px] pt-[40px] text-center [&_a]:text-[var(--color-link-accessible)] [&_a:hover]:text-[var(--color-link-accessible-hover)] dark:[&_a]:text-[var(--color-link-accessible-dark)] dark:[&_a:hover]:text-white">
      <div className="mb-[24px] flex justify-center">
        <a href="https://openjsf.org" target="_blank" rel="noopener noreferrer">
          <img
            className="h-[40px] w-auto dark:invert"
            src={OpenJSLogo}
            alt="شعار OpenJS Foundation"
          />
        </a>
      </div>
      <p className="mx-auto text-[15px] leading-[1.6] text-[#333333] dark:text-[#e0e0e0]">
        حقوق النشر محفوظة لـ <a href="https://openjsf.org">OpenJS Foundation</a>{" "}
        ومساهمي webpack. جميع الحقوق محفوظة. تمتلك{" "}
        <a href="https://openjsf.org">OpenJS Foundation</a> علامات تجارية مسجلة
        وتستخدم علامات تجارية. للاطلاع على قائمة علامات{" "}
        <a href="https://openjsf.org">OpenJS Foundation</a> التجارية، راجع{" "}
        <a href="https://trademark-policy.openjsf.org">
          سياسة العلامات التجارية
        </a>{" "}
        و
        <a href="https://trademark-list.openjsf.org">قائمة العلامات التجارية</a>
        . العلامات والشعارات غير المذكورة في{" "}
        <a href="https://trademark-list.openjsf.org">
          قائمة علامات OpenJS Foundation التجارية
        </a>{" "}
        هي علامات تجارية&trade; أو علامات تجارية مسجلة&reg; لمالكيها. استخدام
        هذه العلامات لا يعني وجود ارتباط أو تأييد من مالكيها.
      </p>
      <p className="mx-auto mt-[18px] text-[15px] leading-[1.6] text-[#333333] dark:text-[#e0e0e0]">
        <a href="https://openjsf.org">OpenJS Foundation</a> |{" "}
        <a href="https://terms-of-use.openjsf.org">شروط الاستخدام</a> |{" "}
        <a href="https://privacy-policy.openjsf.org">سياسة الخصوصية</a> |{" "}
        <a href="https://bylaws.openjsf.org">اللوائح الداخلية</a> |{" "}
        <a href="https://code-of-conduct.openjsf.org">مدونة السلوك</a> |{" "}
        <a href="https://trademark-policy.openjsf.org">
          سياسة العلامات التجارية
        </a>{" "}
        |{" "}
        <a href="https://trademark-list.openjsf.org">قائمة العلامات التجارية</a>{" "}
        |{" "}
        <a href="https://www.linuxfoundation.org/cookies">
          سياسة ملفات تعريف الارتباط
        </a>
      </p>
    </Container>
    <Container className="flex flex-wrap justify-center gap-y-4 content-center border-t border-[#f2f2f2] px-0 py-[0.4em] md:flex-row md:justify-between">
      <section
        className="mx-auto flex max-w-full flex-[0_0_auto] flex-wrap items-center justify-center gap-x-[1.5em] gap-y-2 py-[0.25em] md:m-0 md:justify-start md:ps-[1.5em] md:py-0"
        aria-label="روابط سريعة"
      >
        <Link className={footerLinkClasses} to="/guides/getting-started/">
          البدء
        </Link>
        <Link className={footerLinkClasses} to="/comparison/">
          المقارنة
        </Link>
        <Link
          className={footerLinkClasses}
          to="https://privacy-policy.openjsf.org/"
        >
          سياسة الخصوصية
        </Link>
      </section>

      <section
        className="hidden md:block md:flex-[0_0_auto]"
        aria-label="الرئيسية"
      >
        <Link to="/" className="inline-block h-[35px]">
          <img
            className="inline-block h-full w-auto"
            src={Icon}
            alt="أيقونة webpack"
            width={35}
            height={35}
          />
        </Link>
      </section>

      <section
        className="mx-auto flex max-w-full flex-[0_0_auto] flex-wrap items-center justify-center gap-x-[1.5em] gap-y-2 py-[0.25em] md:m-0 md:justify-end md:py-0 md:pe-[1.5em]"
        aria-label="الموارد والروابط"
      >
        <Link
          className={footerLinkClasses}
          to="https://webpack.threadless.com/"
        >
          متجر المنتجات
        </Link>
        <Link className={footerLinkClasses} to="/awesome-webpack/">
          Awesome webpack
        </Link>
        <Link className={footerLinkClasses} to="/glossary/">
          مسرد المصطلحات
        </Link>
        <Link className={footerLinkClasses} to="/branding/">
          الهوية البصرية
        </Link>
        <Link
          className={footerLinkClasses}
          to="https://github.com/webpack/webpack/releases"
        >
          سجل التغييرات
        </Link>
        <Link
          className="inline-flex h-[25px] items-center gap-4 align-middle [&_img]:inline-block [&_img]:h-full [&_img]:w-auto"
          to="/license"
        >
          <img
            alt="رخصة Creative Commons (CC)"
            src={CC}
            width={25}
            height={25}
          />
          <img
            alt="نَسب Creative Commons (CC BY)"
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
