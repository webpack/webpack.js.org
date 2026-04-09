import AGChartsLogoDark from "../../assets/ag-charts-logo-dark.png";
import AGChartsLogo from "../../assets/ag-charts-logo.png";
import AGLogoDark from "../../assets/ag-grid-logo-dark.png";
import AGLogo from "../../assets/ag-grid-logo.png";
import WebpackIcon from "../../assets/icon-square-small.svg";
import Link from "../Link/Link.jsx";

// Tailwind CSS is used for styling

const Sponsors = () => (
  <div className="absolute h-full w-[250px] ml-[-250px] mr-2.5">
    <div className="sticky hidden xl:flex flex-wrap justify-center items-start border-r-2 border-gray-200 my-6 px-6 pb-12 overflow-hidden bg-transparent transition-colors duration-200 top-24">
      {/* AG Grid */}
      <div className="bg-white dark:bg-black shadow-lg rounded-lg m-2 transition-transform duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 dark:shadow-[0_0_40px_rgba(255,255,255,0.18)]">
        <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
          {/* Light mode */}
          <img
            src={AGLogo}
            alt="ag grid"
            width={220}
            loading="lazy"
            className="block dark:hidden"
          />

          {/* Dark mode */}
          <img
            src={AGLogoDark}
            alt="ag grid dark"
            width={220}
            loading="lazy"
            className="hidden dark:block"
          />
        </Link>
      </div>

      {/* AG Charts */}
      <div className="bg-white dark:bg-black shadow-lg rounded-lg m-2 transition-transform duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 dark:shadow-[0_0_40px_rgba(255,255,255,0.18)]">
        <Link to="https://charts.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
          {/* Light mode */}
          <img
            src={AGChartsLogo}
            alt="ag charts"
            width={220}
            loading="lazy"
            className="block dark:hidden"
          />

          {/* Dark mode */}
          <img
            src={AGChartsLogoDark}
            alt="ag charts dark"
            width={220}
            loading="lazy"
            className="hidden dark:block"
          />
        </Link>
      </div>

      {/* Webpack Sponsor */}
      <div className="m-5 flex flex-col items-center transition-transform duration-200">
        <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
          <div className="text-3xl font-normal text-gray-600 dark:text-gray-400 my-4 text-center leading-snug">
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

          <div className="italic text-2xl text-gray-600 dark:text-gray-400 my-4 text-center">
            Proud to partner with webpack
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default Sponsors;
