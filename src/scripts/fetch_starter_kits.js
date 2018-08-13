#!/usr/bin/env node
const fs = require('fs');
const starters = require('javascriptstuff-db/react-starter-projects');

const webpackStarters = starters.projects.filter(p => p.tags.some(t => t.includes('webpack')));

const data = webpackStarters.map(ws =>
  ({ ...ws,
    githubUrl: `https://github.com/${ws.githubPath}`,
    githubUserName: ws.githubPath.split('/')[0],
    githubRepoName: ws.githubPath.split('/')[1]
  })
);

const body = JSON.stringify(data);

fs.writeFile('./src/components/StarterKits/starter-kits-data.json', body, err => {
  if (err) {
    console.error('Failed to write starter kits file: ', err);

  } else console.log('Fetched 1 file: starter-kits-data.json');
});
