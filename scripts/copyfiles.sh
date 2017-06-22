#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

rm -rf ./generated

mkdir -p ./generated/loaders
cp -rf ./content/loaders/ ./generated/loaders
mkdir -p ./generated/plugins
cp -rf ./content/plugins/ ./generated/plugins

# Fetch sponsors and backers from opencollective
./scripts/fetch_supporters.js

# Fetch starter kits
./scripts/fetch_starter_kits.js