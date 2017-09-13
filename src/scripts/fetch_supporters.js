#!/usr/bin/env node
const fs = require('fs');
const request = require('request');

request('https://opencollective.com/webpack/goldsponsors.json?requireActive=false', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch goldsponsors: ', err);

  } fs.writeFile('./src/components/Support/support-goldsponsors.json', body, err => {
    if (err) {
      console.error('Failed to write goldsponsors file: ', err);

    } else console.log('Fetched 1 file: support-goldsponsors.json');
  });
});

request('https://opencollective.com/webpack/silversponsors.json?requireActive=false', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch silversponsors: ', err);

  } fs.writeFile('./src/components/Support/support-silversponsors.json', body, err => {
    if (err) {
      console.error('Failed to write silversponsors file: ', err);

    } else console.log('Fetched 1 file: support-silversponsors.json');
  });
});

request('https://opencollective.com/webpack/sponsors.json?requireActive=false', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch sponsors: ', err);

  } fs.writeFile('./src/components/Support/support-sponsors.json', body, err => {
    if (err) {
      console.error('Failed to write sponsors file: ', err);

    } else console.log('Fetched 1 file: support-sponsors.json');
  });
});

request('https://opencollective.com/webpack/backers.json?requireActive=false', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch backers: ', err);

  } fs.writeFile('./src/components/Support/support-backers.json', body, err => {
    if (err) {
      console.error('Failed to write backers file: ', err);

    } else console.log('Fetched 1 file: support-backers.json');
  });
});
