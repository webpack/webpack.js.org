import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import _ from "lodash";
import { mkdirp } from "mkdirp";
import { excludedLoaders, excludedPlugins } from "./constants.mjs";
import api from "./githubAPI.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const fetch = {
  loaders: [
    {
      organization: "webpack",
      suffixes: ["-loader"],
      hides: excludedLoaders,
    },
    "babel/babel-loader",
  ],
  plugins: [
    {
      organization: "webpack",
      suffixes: ["-webpack-plugin", "-extract-plugin"],
      hides: excludedPlugins,
    },
    "yoriiis/svg-chunk-webpack-plugin",
    "yoriiis/chunks-webpack-plugin",
  ],
};

async function paginate(org) {
  const data = await api.paginate("GET /orgs/:org/repos", {
    org,
    type: "public",
  });
  return data;
}
mkdirp.sync(path.resolve(__dirname, "../../repositories/"));

for (const [type, collection] of Object.entries(fetch)) {
  const jsonPath = path.resolve(__dirname, `../../repositories/${type}.json`);

  try {
    const result = await Promise.all(
      collection.map(async (item) => {
        if (typeof item === "string") {
          return item;
        }

        const { organization, suffixes, hides } = item;

        const repos = await paginate(organization);

        console.log(repos);

        return repos
          .map((repo) => repo.full_name)
          .filter((name) => suffixes.some((suffix) => name.endsWith(suffix)))
          .filter((name) => !hides.includes(name));
      }),
    );

    const json = JSON.stringify(result.flat(), undefined, 2);

    await writeFile(jsonPath, json);
    console.log(`Fetched file: ${jsonPath}`);
  } catch (err) {
    const rateLimit = await api.rateLimit.get();
    console.log("Rate Limit", rateLimit?.data?.resources?.core);

    try {
      const info = await stat(jsonPath);

      // error is acceptable if the data from cache is less than 48 hours old
      if (info.mtimeMs < Date.now() - 48 * 60 * 60 * 1000) {
        throw err;
      } else {
        console.warn(err.message);
      }
    } catch {
      throw err;
    }
  }
}
