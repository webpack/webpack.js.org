/**
 * Test if localStorage is enabled.
 *
 * {@link https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js}
 * @return {undefined|boolean} Returns false on error.
 */
module.exports = function () {
  const test = 'localStorageTest';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return false;
  }
};
