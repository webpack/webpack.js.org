#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const request = require('request-promise');
const { uniqBy } = require('lodash');

const asyncWriteFile = promisify(fs.writeFile);

const REQUIRED_KEYS = ['totalDonations', 'slug', 'name'];
const filename = '_supporters.json';
const absoluteFilename = path.resolve(
  __dirname,
  '..',
  'components',
  'Support',
  filename
);

const graphqlEndpoint = 'https://api.opencollective.com/graphql/v2';

const graphqlQuery = `query account($limit: Int, $offset: Int) {
  account(slug: "webpack") {
    orders(limit: $limit, offset: $offset) {
      limit
      offset
      totalCount
      nodes {
        fromAccount {
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

const graphqlPageSize = 1000;

const nodeToSupporter = (node) => {
  return {
    name: node.fromAccount && node.fromAccount.name,
    slug: node.fromAccount && node.fromAccount.slug,
    website: node.fromAccount && node.fromAccount.website,
    avatar: node.fromAccount && node.fromAccount.imageUrl,
    firstDonation: node.createdAt,
    totalDonations: node.totalDonations.value * 100,
  };
};

const getAllOrders = async () => {
  const requestOptions = {
    method: 'POST',
    uri: graphqlEndpoint,
    body: {
      query: graphqlQuery,
      variables: { limit: graphqlPageSize, offset: 0 },
    },
    json: true,
  };

  let allOrders = [];

  // Handling pagination if necessary (2 pages for ~1400 results in May 2019)
  // eslint-disable-next-line
  while (true) {
    const result = await request(requestOptions);
    const orders = result.data.account.orders.nodes;
    allOrders = [...allOrders, ...orders];
    requestOptions.body.variables.offset += graphqlPageSize;
    if (orders.length < graphqlPageSize) {
      return allOrders;
    }
  }
};

getAllOrders()
  .then((orders) => {
    let supporters = orders
      .map(nodeToSupporter)
      .sort((a, b) => b.totalDonations - a.totalDonations);

    // Deduplicating supporters with multiple orders
    supporters = uniqBy(supporters, 'slug');

    if (!Array.isArray(supporters)) {
      throw new Error('Supporters data is not an array.');
    }

    for (const item of supporters) {
      for (const key of REQUIRED_KEYS) {
        if (!item || typeof item !== 'object') {
          throw new Error(
            `Supporters: ${JSON.stringify(item)} is not an object.`
          );
        }
        if (!(key in item)) {
          throw new Error(
            `Supporters: ${JSON.stringify(item)} doesn't include ${key}.`
          );
        }
      }
    }

    // Write the file
    return asyncWriteFile(
      absoluteFilename,
      JSON.stringify(supporters, null, 2)
    ).then(() => console.log(`Fetched 1 file: ${filename}`));
  })
  .catch((error) => {
    console.error('utilities/fetch-supporters:', error);
  });
