import { useEffect, useState } from "react";
import AGChartsLogoDark from "../../assets/ag-charts-logo-dark.png";
import AGChartsLogo from "../../assets/ag-charts-logo.png";
import AGLogoDark from "../../assets/ag-grid-logo-dark.png";
import AGLogo from "../../assets/ag-grid-logo.png";
import WebpackIcon from "../../assets/icon-square-small.svg";
import Link from "../Link/Link.jsx";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark",
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

const Sponsors = () => {
  const isDark = useDarkMode();
  return (
    <div className="absolute mr-[8px] ml-[-250px] h-full w-[250px]">
      <div className="sticky hidden my-[1.5em] top-6em mx-[0] pt-[0] px-[1.5em] pb-[3em] flex-wrap justify-center items-start overflow-hidden 2xl:flex border-r-2 border-solid border-[rgba(141, 214, 249, 0.35)] transition-colors duration-250">
        <div className="rounded-[8px] m-[8px] transition-transform duration-200 dark:hover:bg-[rgb(50,50,50)] hover:scale-105 shadow-[0_3px_10px_0px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_10px_0px_rgba(255,255,255,0.2)] hover:bg-[#f2f2f2]">
          <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <img
              className="agGridLogo"
              src={isDark ? AGLogoDark : AGLogo}
              alt="ag grid"
              width={220}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="rounded-[8px] m-[8px] transition-transform duration-200 dark:hover:bg-[rgb(50,50,50)] hover:scale-105 shadow-[0_3px_10px_0px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_10px_0px_rgba(255,255,255,0.2)] hover:bg-[#f2f2f2]">
          <Link to="https://charts.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <img
              className="agChartsLogo"
              src={isDark ? AGChartsLogoDark : AGChartsLogo}
              alt="ag charts"
              width={220}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="sponsors__link-wrapper-2">
          <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <div className="text-center text-[2em] my-[1rem] mx-[0] text-[#535353] dark:text-[#f2f2f2]">
              Datagrid and Charting for Enterprise Applications
            </div>
            <div className="flex justify-center">
              <img src={WebpackIcon} alt="ag grid" width={220} loading="lazy" />
            </div>
            <div className="text-center italic text-[1.7em] my-[1rem] mx-[0] text-[#535353] dark:text-[#f2f2f2]">
              Proud to partner with webpack
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
