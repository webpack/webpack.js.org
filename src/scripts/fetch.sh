#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

fetchPackages() {
  # Fetch webpack-contrib (and various other) loader repositories
  node ./src/utilities/fetch_packages.js "webpack-contrib" "-loader" "README.md" "./src/content/loaders"
  node ./src/utilities/fetch_packages.js "babel" "babel-loader" "README.md" "./src/content/loaders"
  node ./src/utilities/fetch_packages.js "postcss" "postcss-loader" "README.md" "./src/content/loaders"
  node ./src/utilities/fetch_packages.js "peerigon" "extract-loader" "README.md" "./src/content/loaders"

  # Fetch webpack-contrib (and various other) plugin repositories
  node ./src/utilities/fetch_packages.js "webpack-contrib" "-webpack-plugin" "README.md" "./src/content/plugins"
  node ./src/utilities/fetch_packages.js "webpack-contrib" "-extract-plugin" "README.md" "./src/content/plugins"
}

# If not defined, means running locally, so, fetch packages
if [ -z "$TRAVIS_PULL_REQUEST" ]; then
  fetchPackages
# If defined and equal to false, means running in master, so, fetch packages
elif [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  fetchPackages
else
  echo "PR running, not fetching packages."
fi

# Fetch sponsors and backers from opencollective
node ./src/utilities/fetch-supporters.js

# Fetch starter kits
node ./src/utilities/fetch-starter-kits.js
