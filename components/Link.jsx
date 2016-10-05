import React from 'react';

let RRouter;
if (__DEV__) {
  RRouter = require('react-router');
}

const Link = ({ to, ...props }) => {
  if (__DEV__) {
    return <RRouter.Link to={to} {...props} />;
  }

  return <a href={to} {...props} />;
};

export default Link;
