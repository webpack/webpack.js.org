#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

rm -rf ./generated
mkdir -p ./generated/loaders
cp -rf ./src/content/loaders/ ./generated/loaders
mkdir -p ./generated/plugins
cp -rf ./src/content/plugins/ ./generated/plugins

# Fetch webpack-contrib (and various other) loader repositories
./src/scripts/fetch_package_names.js "webpack-contrib" "-loader" | ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"
./src/scripts/fetch_package_names.js "babel" "babel-loader" | ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"
./src/scripts/fetch_package_names.js "postcss" "postcss-loader" | ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"
./src/scripts/fetch_package_names.js "peerigon" "extract-loader" | ./src/scripts/fetch_package_files.js "README.md" "./generated/loaders"

# Fetch webpack-contrib (and various other) plugin repositories
./src/scripts/fetch_package_names.js "webpack-contrib" "-webpack-plugin" | ./src/scripts/fetch_package_files.js "README.md" "./generated/plugins"

# Fetch sponsors and backers from opencollective
./src/scripts/fetch_supporters.js

# Fetch starter kits
./src/scripts/fetch_starter_kits.js
