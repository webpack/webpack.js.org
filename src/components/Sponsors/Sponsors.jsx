import Link from '../Link/Link';
import AGLogo from '../../assets/ag-grid-logo.png';
import AGChartsLogo from '../../assets/ag-charts-logo.png';
import WebpackIcon from '../../assets/icon-square-small.svg';
import '../Sponsors/Sponsors.scss';

const Sponsors = () => {
  return (
    <div className="sponsors">
      <div className="sponsors__content">
        <div className="sponsors__buttons__wrapper">
          <div className="sponsors__link-wrapper">
            <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
              <img
                className="agGridLogo"
                src={AGLogo}
                alt="ag grid"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="sponsors__link-wrapper">
            <Link to="https://charts.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
              <img
                className="agChartsLogo"
                src={AGChartsLogo}
                alt="ag charts"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
        <div className="sponsors__link-wrapper-2">
          <Link to="https://www.ag-grid.com/?utm_source=webpack&utm_medium=banner&utm_campaign=sponsorship">
            <div className="sponsors__tagline">
              Datagrid and Charting for Enterprise Applications
            </div>
            <div className="sponsors__img__wrapper">
              <img
                src={WebpackIcon}
                alt="webpack"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
            <div className="sponsors__footer">
              Proud to partner with webpack
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
