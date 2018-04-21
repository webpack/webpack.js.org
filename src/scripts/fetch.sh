#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Fetch webpack-contrib (and various other) loader repositories
 node ./src/utils/fetchPackageNames.js "webpack-contrib" "-loader" | node ./src/utils/fetchPackageFiles.js "README.md" "./src/content/loaders"
node ./src/utils/fetchPackageNames.js "babel" "babel-loader" | node ./src/utils/fetchPackageFiles.js "README.md" "./src/content/loaders"
node ./src/utils/fetchPackageNames.js "postcss" "postcss-loader" | node ./src/utils/fetchPackageFiles.js "README.md" "./src/content/loaders"
 node ./src/utils/fetchPackageNames.js "peerigon" "extract-loader" | node ./src/utils/fetchPackageFiles.js "README.md" "./src/content/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
node ./src/utils/fetchPackageNames.js "webpack-contrib" "-webpack-plugin" | node ./src/utils/fetchPackageFiles.js "README.md" "./src/content/plugins"

# Fetch sponsors and backers from opencollective
node ./src/utils/fetchSupporters.js

# Fetch starter kits
node ./src/utils/fetchStarterKits.js
