// Import External Dependencies
import { Suspense, lazy, useEffect, useState } from "react";

// Import Components
import SplashContent from "../../content/index.mdx";
import isClient from "../../utilities/is-client.js";
import Container from "../Container/Container.jsx";
import Markdown from "../Markdown/Markdown.jsx";
import { PlaceholderComponent } from "../Placeholder/Placeholder.jsx";
import SplashViz from "../SplashViz/SplashViz.jsx";

// Import helpers

// Import Demo Content

// Load Styling
import "./Splash.scss";

const Support = lazy(() => import("../Support/Support.jsx"));

const SponsorsPlaceholder = () => (
  <>
    <h2>Latest Sponsors</h2>
    <PlaceholderComponent />

    <h2>Platinum Sponsors</h2>
    <PlaceholderComponent />

    <h2>Gold Sponsors</h2>
    <PlaceholderComponent />

    <h2>Silver Sponsors</h2>
    <PlaceholderComponent />

    <h2>Bronze Sponsors</h2>
    <PlaceholderComponent />

    <h2>Backers</h2>
    <PlaceholderComponent />
  </>
);

const Splash = () => {
  const [showSponsors, setShowSponsors] = useState(false);
  const [supportType, setSupportType] = useState(() =>
    Math.random() < 0.33 ? "monthly" : "total",
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isClient) setShowSponsors(true);
  }, []);
  return (
    <div className="splash">
      <SplashViz />

      <div className="splash__section splash__section--dark page__content">
        <Container>
          <Markdown>
            <SplashContent />
          </Markdown>
        </Container>
      </div>

      <div className="splash__section page__content">
        <Container>
          <Markdown>
            <h1 id="sponsors">Support the Team</h1>

            <p>
              Through contributions, donations, and sponsorship, you allow
              webpack to thrive. Your donations directly support office hours,
              continued enhancements, and most importantly, great documentation
              and learning material!
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
                    Show sponsors by their average monthly amount of sponsoring
                    in the last year.
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
