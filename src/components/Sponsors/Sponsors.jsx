// Import External Dependencies
import Link from '../Link/Link';

import DocschinaLogo from '../../assets/docschina-logo.png';

// Load Styling
import '../Sponsors/Sponsors.scss';

// Create and export the component
const Sponsors = () => {
  return (
    <div className="sponsors">
<<<<<<< HEAD
      <Link className="sponsors__content" to="https://docschina.org">
        <img className="sponsors__img__docschina" src={DocschinaLogo} />
=======
      <Link
        className="sponsors__content"
        to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship"
      >
        <img
          src={AGLogo}
          width={260}
          height={140}
          alt="ag grid"
          loading="lazy"
        />
        <img
          className="sponsors__img__webpack"
          src={WebpackIcon}
          alt="webpack"
          width={150}
          height={150}
          loading="lazy"
        />
>>>>>>> 4db15f6f03f5ff286192bc41da319b0171baea4e
        <div className="sponsors__content-cont">
          翻译/文档内容有任何问题，请联系我们
        </div>
      </Link>
    </div>
  );
};
export default Sponsors;
