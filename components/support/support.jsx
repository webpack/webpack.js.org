import React from 'react';

export default ({number, type}) => {
  let fun = 'sponsorLoaded';
  let style = 'sponsors';

 if(type === 'backer') {
   fun = 'backerLoaded';
   style = 'backers';
 }

  return (
    <div className={style}>
      {[...Array(number)].map((x, i) =>
        <a href={"https://opencollective.com/webpack/"+ type +"/" + i + "/website"} target="_blank" key={i}>
          <img src={"//opencollective.com/webpack/"+ type +"/" + i + "/avatar"} alt=""
               onLoad={"(function(a){window.CloudFlare &amp;&amp; window.CloudFlare.push(function(b){b([&quot;cloudflare/rocket&quot;],function(c){c.push(function(){(function(){window.avatars." + fun + "()}).call(a)})})})})(this);"}
          />
        </a>
      )}
    </div>
  );
};
