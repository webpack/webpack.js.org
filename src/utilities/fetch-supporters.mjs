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

if (fs.existsSync(absoluteFilename) && process.env.FORCE_FETCH !== "true") {
  console.log(
    `${filename} already exists, skipping fetch. Use FORCE_FETCH=true to override.`,
  );
} else {
  let graphqlEndpoint = "https://api.opencollective.com/graphql/v2";

  if (process.env.OPENCOLLECTIVE_API_KEY) {
    console.log(
      "Using personal access token to fetch supporters from OpenCollective",
    );
    graphqlEndpoint = `https://api.opencollective.com/graphql/v2?personalToken=${process.env.OPENCOLLECTIVE_API_KEY}`;
  } else {
    console.log(
      "No personal access token found, using public API to fetch supporters from OpenCollective",
    );
  }

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
        ).toISOString(),
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
            if (json.error) {
              remaining = 0;
              reset = Date.now() + 1000 * 60;
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
          console.log("something wrong when fetching supporters");
          return {
            error: {
              message: await response.text(),
            },
          };
        });
      if (result.error) {
        console.log("error", result.error);
      } else {
        const nodes = getNodes(result.data);
        allNodes = [...allNodes, ...nodes];
        body.variables.offset += graphqlPageSize;
        if (nodes.length < graphqlPageSize) {
          return allNodes;
        }
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

    await asyncWriteFile(absoluteFilename, JSON.stringify(supporters, null, 2));
    console.log(`Fetched 1 file: ${filename}`);
  } catch (err) {
    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      console.warn(
        "Warning: Could not fetch supporters data. Writing empty fallback file.\n" +
          "Run 'npm run fetch:supporters' with OPENCOLLECTIVE_API_KEY to get real data.\n" +
          `Error: ${err.message}`,
      );
      await asyncWriteFile(absoluteFilename, JSON.stringify([], null, 2));
    } else {
      throw new Error(`Error in utilities/fetch-supporters: ${err}`, {
        cause: err,
      });
    }
  }
}
