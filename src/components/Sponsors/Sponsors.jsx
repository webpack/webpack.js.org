// Import External Dependencies
import React from 'react';
import Link from '../Link/Link';

// Imports for Ad Content
import AGLogo from '../../assets/ag-grid-logo.png';
import WebpackIcon from '../../assets/icon-square-small.svg';

// Load Styling
import '../Sponsors/Sponsors.scss';

// Create and export the component
export default (props) => {
  return (
    <div className="sponsors">
      <Link
        className="sponsors__content"
        to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship"
      >
        <img src={AGLogo} />
        <img className="sponsors__img__webpack" src={WebpackIcon} />
        <div className="sponsors__content-cont">
          ag-grid is proud to partner with webpack
        </div>
      </Link>
    </div>
  );
};
