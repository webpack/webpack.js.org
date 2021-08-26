// Import External Dependencies
import Link from '../Link/Link';

import DocschinaLogo from '../../assets/docschina-logo.png';

// Load Styling
import '../Sponsors/Sponsors.scss';

// Create and export the component
const Sponsors = () => {
  return (
    <div className="sponsors">
      <Link className="sponsors__content" to="https://docschina.org">
        <img className="sponsors__img__docschina" src={DocschinaLogo} />
        <div className="sponsors__content-cont">
          翻译/文档内容有任何问题，请联系我们
        </div>
      </Link>
    </div>
  );
};
export default Sponsors;
