import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page markdown">
      <Helmet>
        <title>Page Not Found | webpack</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <h1>Page Not Found</h1>
      <p>Oops! The page you are looking for has been removed or relocated.</p>
      <Link
        className="no-underline inline-block py-[3px] px-[5px] text-[1.1rem] rounded-[5px] w-auto border border-[#175d96] text-[#175d96] hover:bg-[#175d96] hover:text-white"
        to="/"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
