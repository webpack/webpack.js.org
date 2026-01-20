import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import lodash from "lodash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { uniqBy } = lodash;

const asyncWriteFile = promisify(fs.writeFile);

const REQUIRED_KEYS = ["totalDonations", "slug", "name"];
const filename = "_supporters.json";
const absoluteFilename = path.resolve(
  __dirname,
  "..",
  "components",
  "Support",
  filename,
);

let graphqlEndpoint = "https://api.opencollective.com/graphql/v2";

if (process.env.OPENCOLLECTIVE_API_KEY) {
  // rate limit is 100 requests per minute with personal access token
  // rate limit is 10 requests per minute without personal access token
  console.log(
    "Using personal access token to fetch supporters from OpenCollective",
  );
  // by default a personal access token of @chenxsan was used as I don't have access to the webpack one
  // @doc https://graphql-docs-v2.opencollective.com/access#with-a-personal-token
  graphqlEndpoint = `https://api.opencollective.com/graphql/v2?personalToken=${process.env.OPENCOLLECTIVE_API_KEY}`;
} else {
  console.log(
    "No personal access token found, using public API to fetch supporters from OpenCollective",
  );
}

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

const additionalInformation = {
  "gem-m": {
    name: "Donor",
    website: "https://www.noneedtostudy.com/take-my-praxis-test-for-me",
    avatar:
      "https://webpack.js.org/assets/supporters-noneedtostudy-logo-medium.png",
    alt: "Take My Praxis Test For Me - NoNeedToStudy.com Praxis Tutors",
  },
};

const nodeToSupporter = (node) => {
  const { slug } = node.account;
  const info = additionalInformation[slug];

  return {
    name: node.account.name,
    website: node.account.website,
    avatar: node.account.imageUrl,
    ...info,
    slug,
    firstDonation: node.createdAt,
    totalDonations: node.totalDonations.value * 100,
    monthlyDonations: 0,
  };
};

const getAllNodes = async (graphqlQuery, getNodes) => {
  const body = {
    query: graphqlQuery,
    variables: {
      limit: graphqlPageSize,
      offset: 0,
      dateFrom: new Date(
        new Date().setFullYear(new Date().getFullYear() - 1),
      ).toISOString(), // data from last year
    },
  };

  let allNodes = [];

  let limit = 10;
  let remaining = 10;
  let reset;
  if (process.env.OPENCOLLECTIVE_API_KEY) {
    limit = 100;
    remaining = 100;
  }
  // Handling pagination if necessary

  while (true) {
    if (remaining === 0) {
      console.log(`Rate limit exceeded. Sleeping until ${new Date(reset)}.`);
      // eslint-disable-next-line no-loop-func
      await new Promise((resolve) => {
        setTimeout(resolve, reset - Date.now() + 100);
      });
    }
    const result = await fetch(graphqlEndpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // eslint-disable-next-line no-loop-func
      .then(async (response) => {
        if (response.headers.get("content-type").includes("json")) {
          const json = await response.json();
          console.log("json", json);
          if (json.error) {
            // when rate limit exceeded, api won't return headers data like x-ratelimit-limit, etc.
            remaining = 0;
            reset = Date.now() + 1000 * 60; // 1 minute
          } else {
            limit = Number(response.headers.get("x-ratelimit-limit"));
            remaining = Number(response.headers.get("x-ratelimit-remaining"));
            reset = Number(response.headers.get("x-ratelimit-reset")) * 1000;
            console.log(
              `Rate limit: ${remaining}/${limit} remaining. Reset in ${new Date(
                reset,
              )}`,
            );
          }
          return json;
        }
        // utilities/fetch-supporters: SyntaxError: Unexpected token < in JSON at position 0
        console.log("something wrong when fetching supporters");
        return {
          error: {
            message: await response.text(),
          },
        };
      });
    // when rate limit exceeded, api will return {error: {message: ''}}
    // but we could hopefully avoid rate limit by sleeping in the beginning of the loop
    // however, when there're multiple task running simultaneously, it's still possible to hit the rate limit
    if (result.error) {
      console.log("error", result.error);
      // let the loop continue
    } else {
      const nodes = getNodes(result.data);
      allNodes = [...allNodes, ...nodes];
      body.variables.offset += graphqlPageSize;
      if (nodes.length < graphqlPageSize) {
        return allNodes;
      }
      // more nodes to fetch
    }
  }
};

try {
  const members = await getAllNodes(
    membersGraphqlQuery,
    (data) => data.account.members.nodes,
  );
  let supporters = members
    .map(nodeToSupporter)
    .toSorted((a, b) => b.totalDonations - a.totalDonations);

  // Deduplicating supporters with multiple orders
  supporters = uniqBy(supporters, "slug");

  const supportersBySlug = new Map();
  for (const supporter of supporters) {
    for (const key of REQUIRED_KEYS) {
      if (!supporter || typeof supporter !== "object") {
        throw new Error(
          `Supporters: ${JSON.stringify(supporter)} is not an object.`,
        );
      }
      if (!(key in supporter)) {
        throw new Error(
          `Supporters: ${JSON.stringify(supporter)} doesn't include ${key}.`,
        );
      }
    }
    supportersBySlug.set(supporter.slug, supporter);
  }

  // Calculate monthly amount from transactions
  const transactions = await getAllNodes(
    transactionsGraphqlQuery,
    (data) => data.transactions.nodes,
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
  await asyncWriteFile(absoluteFilename, JSON.stringify(supporters, null, 2));

  console.log(`Fetched 1 file: ${filename}`);
} catch (err) {
  throw new Error(`Error in utilities/fetch-supporters: ${err}`, {
    cause: err,
  });
}
