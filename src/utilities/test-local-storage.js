/**
 * Test if localStorage is enabled.
 *
 * {@link https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js}
 * @return {undefined | boolean} Returns false on error.
 */
module.exports = function testLolcalStorage() {
  const test = "localStorageTest";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
  } catch {
    return false;
  }
};
