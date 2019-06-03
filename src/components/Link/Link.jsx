import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  to = '',
  url,
  ...props
}) => {
  // XXX: Please `react-banner` for now, but we can update that package to
  // mimick the `NavLink` API
  if ( url ) to = url;

  if ( to.startsWith('http') || to.startsWith('//') )
    return <a href={ to } target="_blank" rel="noopener" { ...props } />;

  else return <Link to={ to } { ...props } />;
};
