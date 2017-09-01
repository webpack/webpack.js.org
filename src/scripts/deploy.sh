#!/bin/bash
# see https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="cn"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build and linting links/prose/js."
    # skip fetching loaders/plugins in cn version
    # npm run fetch
    npm run build
    npm run lint:js
    # npm run lint:prose
    # npm run lint:links
    # npm test
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}

# Fetch loaders/plugins etc. Skip this process in cn version
# npm run fetch

# Run our build
npm run build

# Set some git options
git config --global user.name "Travis CI"
git config --global user.email "ci@travis-ci.org"
git remote set-url origin "${SSH_REPO}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
#ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
#ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
#ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
#ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $encrypted_7562052d3e34_key -iv $encrypted_7562052d3e34_iv -in src/scripts/deploy_key.enc -out src/scripts/deploy_key -d
chmod 600 src/scripts/deploy_key
eval `ssh-agent -s`
ssh-add src/scripts/deploy_key
chmod -R 777 node_modules/gh-pages/

# Now that we're all set up, we can deploy
npm run deploy