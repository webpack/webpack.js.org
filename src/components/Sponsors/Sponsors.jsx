import { useEffect, useState } from "react";
import AGChartsLogoDark from "../../assets/ag-charts-logo-dark.png";
import AGChartsLogo from "../../assets/ag-charts-logo.png";
import AGLogoDark from "../../assets/ag-grid-logo-dark.png";
import AGLogo from "../../assets/ag-grid-logo.png";
import WebpackIcon from "../../assets/icon-square-small.svg";
import Link from "../Link/Link.jsx";

const useThemeAsset = (lightSrc, darkSrc) => {
  const [asset, setAsset] = useState(lightSrc);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const root = document.documentElement;
    const setThemeAsset = () => {
      setAsset(root.dataset.theme === "dark" ? darkSrc : lightSrc);
    };

    setThemeAsset();

    const observer = new MutationObserver(setThemeAsset);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, [darkSrc, lightSrc]);

  return asset;
};

const Sponsors = () => {
  const agGridLogo = useThemeAsset(AGLogo, AGLogoDark);
  const agChartsLogo = useThemeAsset(AGChartsLogo, AGChartsLogoDark);

  return (
    <div className="absolute h-full w-[250px] -ml-[250px] mr-2">
      <div className="sticky hidden my-[1.5em] top-[6em] px-[1.5em] pb-[3em] flex-wrap justify-center items-start border-r-2 border-r-[#f2f2f2] overflow-hidden transition-colors duration-[250ms] min-[1525px]:flex">
        <div className="m-2 rounded-[8px] shadow-[0_3px_10px_0px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:bg-[#f2f2f2] hover:scale-105 dark:bg-[rgb(12,12,12)] dark:shadow-[0_3px_10px_0px_rgba(255,255,255,0.2)] dark:hover:bg-[rgb(50,50,50)]">
          <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <img src={agGridLogo} alt="ag grid" width={220} loading="lazy" />
          </Link>
        </div>
        <div className="m-2 rounded-[8px] shadow-[0_3px_10px_0px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:bg-[#f2f2f2] hover:scale-105 dark:bg-[rgb(12,12,12)] dark:shadow-[0_3px_10px_0px_rgba(255,255,255,0.2)] dark:hover:bg-[rgb(50,50,50)]">
          <Link to="https://charts.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <img
              src={agChartsLogo}
              alt="ag charts"
              width={220}
              loading="lazy"
            />
          </Link>
        </div>
        <div>
          <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <div className="my-4 text-center text-[2em] text-[#535353] dark:text-[#cecece]">
              Datagrid and Charting for Enterprise Applications
            </div>
            <div className="flex justify-center w-full">
              <img
                src={WebpackIcon}
                alt="webpack"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
            <div className="my-4 text-center text-[1.7em] italic text-[#535353] dark:text-[#cecece]">
              Proud to partner with webpack
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
