import React from 'react';

export default ({number, type}) => {
  let functionName = 'sponsorLoaded';

  if (type === 'backer') {
    functionName = 'backerLoaded';
  }

  function getImage(a) {
    if (typeof window !== 'undefined') {
      window.CloudFlare && window.CloudFlare.push(
        function(b) {
          b(['cloudflare/rocket'], function(c) {
            c.push(function() {
              (function() { 
                window.avatars[functionName]();
              }).call(a);
            });
          });
        }
      );
    }
  }

  return (
    <div className="support">
      {[...Array(number)].map((x, i) =>
        <a href={"https://opencollective.com/webpack/"+ type +"/" + i + "/website"} target="_blank" key={i}>
          <img src={"//opencollective.com/webpack/"+ type +"/" + i + "/avatar"} alt=""
            onLoad={ getImage(this) }
          />
        </a>
      )}
    </div>
  );
};
