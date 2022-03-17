import { Link } from 'react-router-dom';

// Styles
import './PageNotFound.scss';

export default function PageNotFound() {
  return (
    <div className="page markdown">
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for has been removed or relocated.</p>
      <Link className="button" to="/">
        Go to Homepage
      </Link>
    </div>
  );
}
