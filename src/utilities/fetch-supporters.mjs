#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';
import lodash from 'lodash';
import { __dirname } from '../../webpack.common.mjs';

const { uniqBy } = lodash;

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

// https://github.com/opencollective/opencollective-api/blob/master/server/graphql/v2/query/TransactionsQuery.ts#L81
const graphqlPageSize = 1000;

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

// only query transactions in last year
const transactionsGraphqlQuery = `query transactions($dateFrom: DateTime, $limit: Int, $offset: Int) {
  transactions(account: {
    slug: "webpack"
  }, dateFrom: $dateFrom, limit: $limit, offset: $offset, includeIncognitoTransactions: false) {
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
}`;

const nodeToSupporter = (node) => ({
  name: node.account.name,
  slug: node.account.slug,
  website: node.account.website,
  avatar: node.account.imageUrl,
  firstDonation: node.createdAt,
  totalDonations: node.totalDonations.value * 100,
  monthlyDonations: 0,
});

const getAllNodes = async (graphqlQuery, getNodes) => {
  const body = {
    query: graphqlQuery,
    variables: {
      limit: graphqlPageSize,
      offset: 0,
      dateFrom: new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
      ).toISOString(), // data from last year
    },
  };

  let allNodes = [];

  // Handling pagination if necessary
  // eslint-disable-next-line
  while (true) {
    const result = await fetch(graphqlEndpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
    console.log(result);
    if (result.errors) throw new Error(result.errors[0].message);
    const nodes = getNodes(result.data);
    allNodes = [...allNodes, ...nodes];
    body.variables.offset += graphqlPageSize;
    if (nodes.length < graphqlPageSize) {
      return allNodes;
    } else {
      // sleep for a while
      await new Promise((resolve) => setTimeout(resolve, 6000));
    }
  }
};

(async () => {
  const members = await getAllNodes(
    membersGraphqlQuery,
    (data) => data.account.members.nodes
  );
  let supporters = members
    .map(nodeToSupporter)
    .sort((a, b) => b.totalDonations - a.totalDonations);

  // Deduplicating supporters with multiple orders
  supporters = uniqBy(supporters, 'slug');

  const supportersBySlug = new Map();
  for (const supporter of supporters) {
    for (const key of REQUIRED_KEYS) {
      if (!supporter || typeof supporter !== 'object') {
        throw new Error(
          `Supporters: ${JSON.stringify(supporter)} is not an object.`
        );
      }
      if (!(key in supporter)) {
        throw new Error(
          `Supporters: ${JSON.stringify(supporter)} doesn't include ${key}.`
        );
      }
    }
    supportersBySlug.set(supporter.slug, supporter);
  }

  // Calculate monthly amount from transactions
  const transactions = await getAllNodes(
    transactionsGraphqlQuery,
    (data) => data.transactions.nodes
  );
  for (const transaction of transactions) {
    if (!transaction.amountInHostCurrency) continue;
    const amount = transaction.amountInHostCurrency.value;
    if (!amount || amount <= 0) continue;
    const supporter = supportersBySlug.get(transaction.fromAccount.slug);
    if (!supporter) continue;
    supporter.monthlyDonations += (amount * 100) / 12;
  }

  for (const supporter of supporters) {
    supporter.monthlyDonations = Math.round(supporter.monthlyDonations);
  }

  // Write the file
  return asyncWriteFile(
    absoluteFilename,
    JSON.stringify(supporters, null, 2)
  ).then(() => console.log(`Fetched 1 file: ${filename}`));
})().catch((error) => {
  console.error('utilities/fetch-supporters:', error);
  process.exitCode = 1;
});
