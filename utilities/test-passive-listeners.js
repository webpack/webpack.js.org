/**
 * Test if passive event listeners are supported.
 *
 * {@link https://github.com/Modernizr/Modernizr/blob/master/feature-detects/dom/passiveeventlisteners.js}
 * @return {undefined|bool} Returns false on error.
 */
module.exports = function() {
  const test = "passiveListenersTest";
  let supportsPassive = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {
      return false;
    }
};
