#!/usr/bin/env node

const fs = require('fs');
const toolList = require('tool-list');
const { promisify } = require('util');
const asyncWriteFile = promisify(fs.writeFile);

const data = toolList.startersWithTag('webpack');
const body = JSON.stringify(data);
const file = './src/components/StarterKits/_starter-kits.json';

asyncWriteFile(file, body)
  .catch(error => {
    console.error('utilities/fetch-starter-kits', error);
  });
