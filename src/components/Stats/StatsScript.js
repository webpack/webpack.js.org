import React from 'react';

const statsScript = `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?39edd8e76884f07399be96cd422c9af3";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`;
export default function StatsScript () {
  return (
    <script dangerouslySetInnerHTML={{ __html: statsScript }}></script>
  );
}