#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Fetch webpack-contrib (and various other) loader repositories
 node ./src/utilities/fetchPackageNames.js "webpack-contrib" "-loader" | node ./src/utilities/fetchPackageFiles.js "README.md" "./src/content/loaders"
node ./src/utilities/fetchPackageNames.js "babel" "babel-loader" | node ./src/utilities/fetchPackageFiles.js "README.md" "./src/content/loaders"
node ./src/utilities/fetchPackageNames.js "postcss" "postcss-loader" | node ./src/utilities/fetchPackageFiles.js "README.md" "./src/content/loaders"
 node ./src/utilities/fetchPackageNames.js "peerigon" "extract-loader" | node ./src/utilities/fetchPackageFiles.js "README.md" "./src/content/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
node ./src/utilities/fetchPackageNames.js "webpack-contrib" "-webpack-plugin" | node ./src/utilities/fetchPackageFiles.js "README.md" "./src/content/plugins"

# Fetch sponsors and backers from opencollective
node ./src/utilities/fetchSupporters.js

# Fetch starter kits
node ./src/utilities/fetchStarterKits.js
