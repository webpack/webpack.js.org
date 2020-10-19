#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const request = require('request-promise');
const { uniqBy } = require('lodash');

const asyncWriteFile = promisify(fs.writeFile);

const REQUIRED_KEYS = ['totalDonations', 'slug', 'name'];
const filename = '_supporters.json';
const absoluteFilename = path.resolve(__dirname, '..', 'components', 'Support', filename);

const graphqlEndpoint = 'https://api.opencollective.com/graphql/v2';

const membersGraphqlQuery = `query account($limit: Int, $offset: Int) {
  account(slug: "webpack") {
    members(limit: $limit, offset: $offset) {
      nodes {
        account {
          name
          slug
          website
          imageUrl
        }
        totalDonations {
          value
        }
        createdAt
      }
    }
  }
}`;

const transactionsGraphqlQuery = `query account($limit: Int, $offset: Int) {
  account(slug: "webpack") {
    transactions(limit: $limit, offset: $offset, includeIncognitoTransactions: false) {
      nodes {
        amountInHostCurrency {
          value
        }
        fromAccount {
          name
          slug
          website
          imageUrl
        }
        createdAt
      }
    }
  }
}`;

const graphqlPageSize = 5000;

const nodeToSupporter = node => ({
  name: node.account.name,
  slug: node.account.slug,
  website: node.account.website,
  avatar: node.account.imageUrl,
  firstDonation: node.createdAt,
  totalDonations: node.totalDonations.value * 100,
  monthlyDonations: 0
});

const getAllNodes = async (graphqlQuery, getNodes) => {
  const requestOptions = {
    method: 'POST',
    uri: graphqlEndpoint,
    body: { query: graphqlQuery, variables: { limit: graphqlPageSize, offset: 0 } },
    json: true
  };

  let allNodes = [];

  // Handling pagination if necessary
  // eslint-disable-next-line
  while (true) {
    const result = await request(requestOptions);
    const nodes = getNodes(result.data);
    allNodes = [...allNodes, ...nodes];
    requestOptions.body.variables.offset += graphqlPageSize;
    if (nodes.length < graphqlPageSize) {
      return allNodes;
    }
  }
};

const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;

(async () => {
  const members = await getAllNodes(membersGraphqlQuery, data => data.account.members.nodes);
  let supporters = members.map(nodeToSupporter).sort((a, b) => b.totalDonations - a.totalDonations);

  // Deduplicating supporters with multiple orders
  supporters = uniqBy(supporters, 'slug');

  const supportersBySlug = new Map();
  for (const supporter of supporters) {
    for (const key of REQUIRED_KEYS) {
      if (!supporter || typeof supporter !== 'object') {
        throw new Error(`Supporters: ${JSON.stringify(supporter)} is not an object.`);
      }
      if (!(key in supporter)) {
        throw new Error(`Supporters: ${JSON.stringify(supporter)} doesn't include ${key}.`);
      }
    }
    supportersBySlug.set(supporter.slug, supporter);
  }

  // Calculate monthly amount from transactions
  const transactions = await getAllNodes(transactionsGraphqlQuery, data => data.account.transactions.nodes);
  for (const transaction of transactions) {
    if (!transaction.amountInHostCurrency) continue;
    const amount = transaction.amountInHostCurrency.value;
    if (!amount || amount <= 0) continue;
    const date = +new Date(transaction.createdAt);
    if (date < oneYearAgo) continue;
    const supporter = supportersBySlug.get(transaction.fromAccount.slug);
    if (!supporter) continue;
    supporter.monthlyDonations += amount * 100 / 12;
  }

  for (const supporter of supporters) {
    supporter.monthlyDonations = Math.round(supporter.monthlyDonations);
  }

  // Write the file
  return asyncWriteFile(absoluteFilename, JSON.stringify(supporters, null, 2)).then(() =>
    console.log(`Fetched 1 file: ${filename}`)
  );
})().catch(error => {
  console.error('utilities/fetch-supporters:', error);
  process.exitCode = 1;
});
