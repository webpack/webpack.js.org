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
  if (!printUrl) {
    return null;
  }

  return (
    <div className="sidebar-item sidebar-item--disabled`">
      <i className="sidebar-item__toggle icon-vertical-bar" />
      <a className="sidebar-item__title sidebar-link__print"
        href={printUrl}
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
  let urlSplit = urlRaw.split('/');
  return PRINTABLE_SECTIONS.includes(urlSplit[1]) ? `/${urlSplit[1]}/printable/` : false;
}