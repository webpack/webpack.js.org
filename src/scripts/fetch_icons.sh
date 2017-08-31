#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Fetch sponsors and backers from opencollective
node ./src/scripts/fetch_supporters.js

# Fetch starter kits
node ./src/scripts/fetch_starter_kits.js
