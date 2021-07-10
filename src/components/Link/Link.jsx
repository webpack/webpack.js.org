import { Link } from 'react-router-dom';

export default ({ to = '', url, ...props }) => {
  // XXX: Please `react-banner` for now, but we can update that package to
  // mimick the `NavLink` API
  if (url) to = url;

  // eslint-disable-next-line
  const { isActive, ...others } = props;
  if (to.startsWith('http') || to.startsWith('//')) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" {...others} />
    );
  } else {
    return <Link to={to} {...others} />;
  }
};
