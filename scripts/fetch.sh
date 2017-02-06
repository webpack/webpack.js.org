#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

rm -rf ./generated
mkdir -p ./generated/loaders
cp -rf ./content/loaders/ ./generated/loaders
mkdir -p ./generated/plugins
cp -rf ./content/plugins/ ./generated/plugins

# Fetches github.com/webpack/*-loader repositories
./scripts/fetch_package_names.js "webpack" "-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"

# Fetches github.com/webpack/*-webpack-plugin repositories
./scripts/fetch_package_names.js "webpack" "-webpack-plugin" | ./scripts/fetch_package_files.js "README.md" "./generated/plugins"

# Fetches github.com/webpack-contrib/*-loader repositories
./scripts/fetch_package_names.js "webpack-contrib" "-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"

# Fetches github.com/webpack-contrib/*-webpack-plugin repositories
./scripts/fetch_package_names.js "webpack-contrib" "-webpack-plugin" | ./scripts/fetch_package_files.js "README.md" "./generated/plugins"

./scripts/fetch_package_names.js "babel" "babel-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"
