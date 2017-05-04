#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

rm -rf ./generated
mkdir -p ./generated/loaders
cp -rf ./content/loaders/ ./generated/loaders
mkdir -p ./generated/plugins
cp -rf ./content/plugins/ ./generated/plugins

# Fetch webpack-contrib (and various other) loader repositories
./scripts/fetch_package_names.js "webpack-contrib" "-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"
./scripts/fetch_package_names.js "babel" "babel-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"
./scripts/fetch_package_names.js "peerigon" "extract-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
./scripts/fetch_package_names.js "webpack-contrib" "-webpack-plugin" | ./scripts/fetch_package_files.js "README.md" "./generated/plugins"

# Fetch sponsors and backers from opencollective
./scripts/fetch_supporters.js
