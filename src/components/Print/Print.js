import React from 'react';
// Load Styling
import './Print.scss';
import icon from '../../assets/icon-print.svg';

const PRINTABLE_SECTIONS = [
  'api',
  'concepts',
  'configuration',
  'contribute',
  'guides',
  'loaders',
  'migrate',
  'plugins'
];

export default function Print (props) {
    const { url } = props;
    const printUrl = _printPageUrlFromUrl(url);

    // not in a printable section
    if (!url) {
      return null;
    }

    return (
      <div className="sidebar-item sidebar-item--disabled`">
        <i className="sidebar-item__toggle icon-vertical-bar" />
        <a class="sidebar-item__title sidebar-link__print" href={_printPageUrlFromUrl(url)}
          rel="nofollow"
          alt="Print"
          title="Print"
          target="_blank">
          Print Section
          <img src={icon} />
        </a>
      </div>
    );
}

function _printPageUrlFromUrl(urlRaw) {
    // for now support both trailing slash and without it
    // when https://github.com/webpack/webpack.js.org/pull/3064 is merged, this is simplified.
    let url = urlRaw[urlRaw.length-1] === '/' ? urlRaw.substring(0, urlRaw.length-1) : urlRaw;
    let urlSplit = url.split('/');

    if (!PRINTABLE_SECTIONS.includes(urlSplit[1])) {
      return false;
    }

    return (urlSplit.length > 2) ? `/${url.split('/')[1]}/printable/` : `${url}/printable/`;
  }