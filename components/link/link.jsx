import React from 'react';
import startsWith from 'lodash/startsWith';

let RRouter;
if (__DEV__) {
  RRouter = require('react-router');
}

const Link = ({ to, ...props }) => {
  if (__DEV__ && !startsWith(to, 'http')) {
    return <RRouter.Link to={to} {...props} />;
  }

  return <a href={to} {...props} />;
};

export default Link;
