/**
 * Safe version of localStorage that does not throw if localStorage is not available (disabled) in browser
 */
export default {
  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key, value) {
    try {
      return localStorage.setItem(key, value);
    } catch {}
  },

  removeItem(key) {
    try {
      return localStorage.removeItem(key);
    } catch {}
  },

  clear() {
    try {
      return localStorage.clear();
    } catch {}
  }
};
