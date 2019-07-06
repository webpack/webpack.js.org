import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './PageNotFound.scss';

export default () => {
  return (
    <div className="pagenotfound-container">
      <h1 className="pagenotfound-container__head">Page Not Found</h1>
      <h4 className="pagenotfound-container__text">
        Oops! The page you are looking for has been removed or relocated.
      </h4>
      <div className="pagenotfound-container__button">
        <Link to="/">Go to Homepage</Link>
      </div>
    </div>
  );
};
