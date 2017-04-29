#!/usr/bin/env node
const fs = require('fs');
const request = require('request');

request('https://opencollective.com/webpack/sponsors.json', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch sponsors: ', err)

  } fs.writeFile('./components/support/support-sponsors.json', body, err => {
    if (err) console.error('Failed to write sponsors file: ', err)
  })
})

request('https://opencollective.com/webpack/backers.json', (err, response, body) => {
  if (err) {
    console.error('Failed to fetch backers: ', err)

  } fs.writeFile('./components/support/support-backers.json', body, err => {
    if (err) console.error('Failed to write backers file: ', err)
  })
})
