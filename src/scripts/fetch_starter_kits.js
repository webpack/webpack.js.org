#!/usr/bin/env node
const fs = require('fs');
const toolList = require('tool-list');

const data = toolList.startersWithTag('webpack');
const body = JSON.stringify(data);

fs.writeFile('./src/components/StarterKits/starter-kits-data.json', body, err => {
  if (err) {
    console.error('Failed to write starter kits file: ', err);

  } else console.log('Fetched 1 file: starter-kits-data.json');
});
