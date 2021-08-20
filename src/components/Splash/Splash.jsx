// Import External Dependencies
import { lazy, Suspense, useState, useEffect } from 'react';

// Import Components
import Container from '../Container/Container';
import SplashViz from '../SplashViz/SplashViz';
import Markdown from '../Markdown/Markdown';
import { PlaceholderComponent } from '../Placeholder/Placeholder';

// Import helpers
import isClient from '../../utilities/is-client';

// Import Demo Content
import SplashContent from '../../content/index.mdx';

// Load Styling
import './Splash.scss';

// const Support = lazy(() => import('../Support/Support'));

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
    Math.random() < 0.33 ? 'monthly' : 'total'
  );
  useEffect(() => {
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
    </div>
  );
};

export default Splash;
