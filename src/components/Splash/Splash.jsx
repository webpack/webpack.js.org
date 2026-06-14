// Import External Dependencies
import { Suspense, lazy, useState, useSyncExternalStore } from "react";
// Import Components
import SplashContent from "../../content/index.mdx";
import Container from "../Container/Container.jsx";
import Markdown from "../Markdown/Markdown.jsx";
import { PlaceholderComponent } from "../Placeholder/Placeholder.jsx";
import SplashViz from "../SplashViz/SplashViz.jsx";

const Support = lazy(() => import("../Support/Support.jsx"));

const SponsorsPlaceholder = () => (
  <>
    <h2>أحدث الرعاة</h2>
    <PlaceholderComponent />

    <h2>رعاة Platinum</h2>
    <PlaceholderComponent />

    <h2>رعاة Gold</h2>
    <PlaceholderComponent />

    <h2>رعاة Silver</h2>
    <PlaceholderComponent />

    <h2>رعاة Bronze</h2>
    <PlaceholderComponent />

    <h2>الداعمون</h2>
    <PlaceholderComponent />
  </>
);
const Splash = () => {
  const [supportType, setSupportType] = useState(() =>
    typeof window !== "undefined"
      ? Math.random() < 0.33
        ? "monthly"
        : "total"
      : "total",
  );
  const showSponsors = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  return (
    <div className="relative overflow-hidden [&_h1]:justify-center [&_h2]:justify-center">
      <SplashViz />

      <div className="relative text-center bg-[#f3f3f3] dark:bg-[#202020] page__content [&_p]:my-[1em]! [&_p]:mx-auto! [&_p]:max-w-200 [&_pre]:text-left [&_.icon-link]:hidden">
        <Container className="py-[1em] px-[1em] md:px-[1.5em]">
          <Markdown>
            <SplashContent />
          </Markdown>
        </Container>
      </div>

      <div className="relative text-center page__content [&_p]:my-[1em]! [&_p]:mx-auto! [&_p]:max-w-200 [&_pre]:text-left [&_.icon-link]:hidden">
        <Container className="py-[5em] px-[1em] md:px-[1.5em]">
          <Markdown>
            <h1 id="sponsors">ادعم الفريق</h1>

            <p>
              من خلال المساهمات والتبرعات والرعاية، تساعد webpack على الاستمرار
              والتطور. تبرعاتك تدعم ساعات العمل المفتوحة، والتحسينات المستمرة،
              والأهم من ذلك توثيقاً ومواد تعلم أفضل.
            </p>

            {showSponsors ? (
              <Suspense fallback={<SponsorsPlaceholder />}>
                <p>
                  <label htmlFor="support-type">
                    <input
                      id="support-type"
                      type="checkbox"
                      checked={supportType === "monthly"}
                      onChange={(event) =>
                        setSupportType(
                          event.target.checked ? "monthly" : "total",
                        )
                      }
                    />
                    اعرض الرعاة حسب متوسط مبلغ الرعاية الشهري خلال آخر سنة.
                  </label>
                </p>

                <Support type={supportType} rank="latest" />

                <Support type={supportType} rank="platinum" />

                <Support type={supportType} rank="gold" />

                <Support type={supportType} rank="silver" />

                <Support type={supportType} rank="bronze" />

                <Support type={supportType} rank="backer" />
              </Suspense>
            ) : (
              <SponsorsPlaceholder />
            )}
          </Markdown>
        </Container>
      </div>
    </div>
  );
};

export default Splash;
