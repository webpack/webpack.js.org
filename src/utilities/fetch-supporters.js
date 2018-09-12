#!/usr/bin/env node
const fs = require('fs');
const { promisify } = require('util');
const request = require('request-promise');

const asyncWriteFile = promisify(fs.writeFile);

const REQUIRED_KEYS = [ 'totalDonations', 'id' ];
const filename = '_supporters.json';
const url = 'https://opencollective.com/api/groups/webpack/backers';

request(url)
  .then(body => {
    // Basic validation
    const content = JSON.parse(body);

    if (!Array.isArray(content)) {
      throw new Error('Supporters data is not an array.');
    }

    for (const item of content) {
      for (const key of REQUIRED_KEYS) {
        if (!item || typeof item !== 'object') throw new Error(`Supporters: ${JSON.stringify(item)} is not an object.`);
        if (!(key in item)) throw new Error(`Supporters: ${JSON.stringify(item)} doesn't include ${key}.`);
      }
    }

    // Write the file
    return asyncWriteFile(`./src/components/Support/${filename}`, body).then(() => console.log('Fetched 1 file: _supporters.json'));
  })
  .catch(error => {
    console.error('utilities/fetch-supporters:', error);
  });
