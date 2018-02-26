#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const fetchPackageNames = require("./fetch_package_names");
const _ = require("lodash");

const fetchArgsArray = [
  {
    organization: "webpack-contrib",
    suffix: "-loader"
  },
  {
    organization: "webpack-contrib",
    suffix: "-plugin"
  }
];

async function fetchPackageNamesPromise(organization, suffix) {
  return new Promise((resolve, reject) => {
    fetchPackageNames({organization, suffix}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function getPackageJsonFiles(namesArray) {
  const packageJson = require("package-json");
  return Promise.all(namesArray.map((name) => packageJson(name,  {allMetadata: true}) ));
}

function missingPackages() {
  const packages = JSON.parse(fs.readFileSync("./src/components/Compatibility/packages.json", { encoding: "utf8"}))
  const missPeer = packages.filter(p => !p.peerDependencies)
  const missWebpack = packages.filter(p => p.peerDependencies).filter(p => !p.peerDependencies.webpack)
  console.log(missPeer.map(d => d.name))
  console.log(missWebpack.map(d => d.name))
}

async function main() {
  try {
    const [loaderNames, pluginNames] = await Promise.all(
      fetchArgsArray.map(({organization, suffix}) => fetchPackageNamesPromise(organization, suffix))
    );

    const packageFiles = await getPackageJsonFiles([...loaderNames, ...pluginNames].map(d => d.name));

    // TODO: Write to disk the JSON file that gets fetched and then add to script workflow.
    // This should be saved in ./src/Compatibility/packages.json
    fs.writeFile('./src/components/Compatibility/packages.json', JSON.stringify(packageFiles, null, 2), { encoding: "utf8" }, err => {
      if (err) {
        console.error('Failed to write compatible packages file: ', err)
      } else console.log('Fetched 1 file: packages.json')
    })
  } catch (e) {
    console.error(e);
  }
}

main();
