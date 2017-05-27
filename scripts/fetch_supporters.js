#!/usr/bin/env node
const fs = require('fs');
const request = require('request');

request('https://opencollective.com/webpack/sponsors.json?requireActive=false', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch sponsors: ', err);

  } fs.writeFile('./components/support/support-sponsors.json', body, err => {
    if (err) {
      console.error('Failed to write sponsors file: ', err);

    } else console.log('Fetched 1 file: support-sponsors.json')
  });
});

request('https://opencollective.com/webpack/backers.json?requireActive=false', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch backers: ', err);

  } fs.writeFile('./components/support/support-backers.json', body, err => {
    if (err) {
      console.error('Failed to write backers file: ', err);

    } else console.log('Fetched 1 file: support-backers.json')
  });
});
