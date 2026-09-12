"use strict";

module.exports = {
  // No autoprefixer: webpack's CSS minifier adds and removes vendor prefixes
  // itself, from the same browserslist, and strips whatever autoprefixer added.
  plugins: ["@tailwindcss/postcss"],
};
