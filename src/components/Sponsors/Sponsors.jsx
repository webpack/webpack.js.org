// Import External Dependencies
import Link from '../Link/Link';

// Imports for Ad Content
import AGLogo from '../../assets/ag-grid-logo.png';
import WebpackIcon from '../../assets/icon-square-small.svg';

// Load Styling
import '../Sponsors/Sponsors.scss';

// Create and export the component
const Sponsors = () => {
  return (
    <div className="sponsors">
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
        <div className="sponsors__content-cont">
          ag-grid is proud to partner with webpack
        </div>
      </Link>
    </div>
  );
};
export default Sponsors;
