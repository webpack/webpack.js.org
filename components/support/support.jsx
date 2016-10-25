import React from 'react';
import './support-style';

function getImage(a, funcName) {
  if (typeof window !== 'undefined') {
    window.CloudFlare && window.CloudFlare.push(
      function(b) {
        b(['cloudflare/rocket'], function(c) {
          c.push(function() {
            (function() { 
              window.avatars[funcName]();
            }).call(a);
          });
        });
      }
    );
  }
}

export default ({number, type}) => {
  let funcName = type === 'backer' ? 'backerLoaded' : 'sponsorLoaded';

  return (
    <div className="support">
      {[...Array(number)].map((x, i) =>
        <a key={ i }
          className="support__item"
          href={ `https://opencollective.com/webpack/${type}/${i}/website` } 
          target="_blank">
          <img 
            src={ `//opencollective.com/webpack/${type}/${i}/avatar` } 
            alt={ `${type} avatar` }
            onLoad={ getImage(this, funcName) } />
        </a>
      )}

      <div className="support__bottom">
        <a className="support__button" href="https://opencollective.com/webpack#support">
          Become a { type }
        </a>
      </div>
    </div>
  );
};
