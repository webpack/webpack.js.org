#!/usr/bin/env node
const fs = require('fs');
const starters = require('javascriptstuff-db/react-starter-projects');

const file = './src/components/StarterKits/_starter-kits.json';

const webpackStarters = starters.projects.filter(p => p.tags.some(t => t.includes('webpack')));

const data = webpackStarters.map(ws => ({
  ...ws,
  githubUrl: `https://github.com/${ws.githubPath}`,
  githubUserName: ws.githubPath.split('/')[0],
  githubRepoName: ws.githubPath.split('/')[1]
}));

const body = JSON.stringify(data);

fs.writeFile(file, body, err => {
  if (err) {
    console.error('Failed to write starter kits file: ', err);
  } else console.log('Fetched 1 file: _starter-kits.json');
});
