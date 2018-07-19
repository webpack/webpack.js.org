#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

rm -rf ./generated
mkdir -p ./generated/loaders
cp -rf ./src/content/loaders/ ./generated/loaders
mkdir -p ./generated/plugins
cp -rf ./src/content/plugins/ ./generated/plugins

fetchPackages() {
  # Fetch webpack-contrib (and various other) loader repositories
  node ./src/scripts/fetch_packages.js "webpack-contrib" "-loader" "README.md" "./generated/loaders"
  node ./src/scripts/fetch_packages.js "babel" "babel-loader" "README.md" "./generated/loaders"
  node ./src/scripts/fetch_packages.js "postcss" "postcss-loader" "README.md" "./generated/loaders"
  node ./src/scripts/fetch_packages.js "peerigon" "extract-loader" "README.md" "./generated/loaders"

  # Fetch webpack-contrib (and various other) plugin repositories
  node ./src/scripts/fetch_packages.js "webpack-contrib" "-webpack-plugin" "README.md" "./generated/plugins"
  node ./src/scripts/fetch_packages.js "webpack-contrib" "-extract-plugin" "README.md" "./generated/plugins"

  # Remove deprecated or archived plugins repositories
  rm ./generated/plugins/component-webpack-plugin.json ./generated/plugins/component-webpack-plugin.md
}

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  echo "PR running, not fetching packages."
else
  fetchPackages
fi

# Fetch sponsors and backers from opencollective
node ./src/scripts/fetch_supporters.js

# Fetch starter kits
node ./src/scripts/fetch_starter_kits.js
