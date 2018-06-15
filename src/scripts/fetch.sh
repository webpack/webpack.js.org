#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

rm -rf ./generated
mkdir -p ./generated/loaders
cp -rf ./src/content/loaders/ ./generated/loaders
mkdir -p ./generated/plugins
cp -rf ./src/content/plugins/ ./generated/plugins

export GITHUB_TOKEN = $GITHUB_TOKEN

# Fetch webpack-contrib (and various other) loader repositories
node ./src/scripts/fetch_package_names.js "webpack-contrib" "-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"
node ./src/scripts/fetch_package_names.js "babel" "babel-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"
node ./src/scripts/fetch_package_names.js "postcss" "postcss-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"
node ./src/scripts/fetch_package_names.js "peerigon" "extract-loader" | node ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
node ./src/scripts/fetch_package_names.js "webpack-contrib" "-webpack-plugin" | node ./src/scripts/fetch_package_files.js "README.md" "./generated/plugins"
node ./src/scripts/fetch_package_names.js "webpack-contrib" "-extract-plugin" | node ./src/scripts/fetch_package_files.js "README.md" "./generated/plugins"

# Remove deprecated or archived plugins repositories
rm ./generated/plugins/component-webpack-plugin.json ./generated/plugins/component-webpack-plugin.md

# Fetch sponsors and backers from opencollective
node ./src/scripts/fetch_supporters.js

# Fetch starter kits
node ./src/scripts/fetch_starter_kits.js
