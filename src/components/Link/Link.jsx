import React from 'react';
import startsWith from 'lodash/startsWith';

let RRouter;
if (process.env.NODE_ENV === 'development') {
  RRouter = require('react-router-dom');
}

export default ({ to, ...props }) => {
  if (startsWith(to, 'http') || startsWith(to, '//')) {
    return <a href={to} target="_blank" {...props} />;
  }

  if (process.env.NODE_ENV === 'development') {
    return <RRouter.Link to={to} {...props} />;
  }

  return <a href={to} {...props} />;
};
