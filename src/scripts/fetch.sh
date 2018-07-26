#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Fetch webpack-contrib (and various other) loader repositories
node ./src/utilities/fetch-package-names.js "webpack-contrib" "-loader" | node ./src/utilities/fetch-package-files.js "README.md" "./src/content/loaders"
node ./src/utilities/fetch-package-names.js "babel" "babel-loader" | node ./src/utilities/fetch-package-files.js "README.md" "./src/content/loaders"
node ./src/utilities/fetch-package-names.js "postcss" "postcss-loader" | node ./src/utilities/fetch-package-files.js "README.md" "./src/content/loaders"
node ./src/utilities/fetch-package-names.js "peerigon" "extract-loader" | node ./src/utilities/fetch-package-files.js "README.md" "./src/content/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
node ./src/utilities/fetch-package-names.js "webpack-contrib" "-webpack-plugin" | node ./src/utilities/fetch-package-files.js "README.md" "./src/content/plugins"
node ./src/utilities/fetch-package-names.js "webpack-contrib" "mini-css-extract-plugin" | node ./src/utilities/fetch-package-files.js "README.md" "./src/content/plugins"

# Fetch sponsors and backers from opencollective
node ./src/utilities/fetch-supporters.js

# Fetch starter kits
node ./src/utilities/fetch-starter-kits.js
