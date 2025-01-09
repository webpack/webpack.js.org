// RedirectWebpackPlugin won't work for URI fragments
// hence we redirect them with client side script
export default function (location) {
  // cache options were splitted into a separate page
  // see https://github.com/webpack/webpack.js.org/pull/5146
  if (
    location.pathname === '/configuration/other-options/' &&
    location.hash.startsWith('#cache')
  ) {
    return `/configuration/cache/${location.hash}`;
  }
  return false;
}
