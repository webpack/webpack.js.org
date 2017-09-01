#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Fetch webpack-contrib (and various other) loader repositories
node ./src/scripts/fetch_package_names.js "webpack-contrib" "-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./src/content/loaders"
node ./src/scripts/fetch_package_names.js "babel" "babel-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./src/content/loaders"
node ./src/scripts/fetch_package_names.js "postcss" "postcss-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./src/content/loaders"
node ./src/scripts/fetch_package_names.js "peerigon" "extract-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./src/content/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
node ./src/scripts/fetch_package_names.js "webpack-contrib" "-webpack-plugin" | node ./src/scripts/fetch_package_files.js "README.md" "./src/content/plugins"

rm -rf ./src/content/loaders/*.json
rm -rf ./src/content/plugins/*.json
