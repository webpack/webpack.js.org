import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="page markdown">
      <Helmet>
        <title>الصفحة غير موجودة | webpack</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <h1>الصفحة غير موجودة</h1>
      <p>الصفحة التي تبحث عنها أُزيلت أو نُقلت إلى مكان آخر.</p>
      <Link
        className="no-underline inline-block py-[3px] px-[5px] text-[1.1rem] rounded-[5px] w-auto border border-[#175d96] text-[#175d96] hover:bg-[#175d96] hover:text-white"
        to="/"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
