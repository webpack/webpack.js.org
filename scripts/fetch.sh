#!/bin/bash
# see https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
set -e # Exit with nonzero exit code if anything fails

rm -rf ./generated
./scripts/fetch_package_names.js "-loader" | ./scripts/fetch_package_files.js "README.md" "./generated/loaders"
./scripts/fetch_package_names.js "-webpack-plugin" | ./scripts/fetch_package_files.js "README.md" "./generated/plugins"
