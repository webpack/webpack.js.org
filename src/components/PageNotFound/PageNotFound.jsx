import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// Styles
import "./PageNotFound.scss";

export default function PageNotFound() {
  return (
    <div className="page markdown">
      <Helmet>
        <title>Page Not Found | webpack</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for has been removed or relocated.</p>
      <Link className="button" to="/">
        Go to Homepage
      </Link>
    </div>
  );
}
