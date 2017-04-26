import React from 'react';
import './support-style';

const MISSING_SPONSORS = [
  {
    index: 33,
    name: 'MoonMail',
    title: 'Email Marketing Software',
    logo: 'https://static.moonmail.io/moonmail-logo.svg',
    url: 'https://moonmail.io/?utm_source=webpack.js.org'
  },
  {
    index: 34,
    name: 'MONEI',
    title: 'Best payment gateway rates',
    logo: 'https://static.monei.net/monei-logo.svg',
    url: 'https://monei.net/?utm_source=webpack.js.org'
  }
];

export default ({number, type}) => {
  const supportItems = [...Array(number)].map((x, i) =>
    <a key={ i }
       className="support__item"
       href={ `https://opencollective.com/webpack/${type}/${i}/website?requireActive=false` }
       target="_blank">
      <img
        src={ `//opencollective.com/webpack/${type}/${i}/avatar?requireActive=false` }
        alt={ `${type} avatar` } />
    </a>
  );

  // add missing sponsors
  if (type === 'sponsor') {
    MISSING_SPONSORS.forEach(sponsor => {
      supportItems.splice(sponsor.index, 0, (
        <a key={ sponsor.name }
           className="support__item support__missing"
           href={ sponsor.url }
           target="_blank"
           title={ sponsor.title }>
          <img
            src={ sponsor.logo }
            height={ 45 }
            alt={ sponsor.name } />
        </a>
      ));
    });
  }

  return (
    <div className="support">
      {supportItems}
    </div>
  );
};
