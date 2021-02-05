const printScript = `
window.matchMedia('print').addListener(function(mql) {
  if (!mql.matches) {
      window.close();
  }
});
window.print();
`;
export default function PrintScript() {
  return <script dangerouslySetInnerHTML={{ __html: printScript }}></script>;
}
