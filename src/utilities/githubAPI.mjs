import { Octokit as GithubAPI } from '@octokit/rest';
import { createActionAuth } from '@octokit/auth-action';
/** @type import('@octokit/rest').Octokit */
let api;
if (
  process.env.CI &&
  process.env.GITHUB_ACTION &&
  (process.env.CI === 'true' || process.env.CI === '1') // see https://github.com/cypress-io/github-action/blob/9674a20f82e9e45ec75aa66038310b00e2f24657/index.js#L223 for CI === '1'
) {
  const auth = createActionAuth();
  const authentication = await auth();
  api = new GithubAPI({
    auth: authentication.token,
  });
  console.log('api is authenticated');
} else if (process.env.CI && process.env.VERCEL) {
  // see https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables#system-environment-variables
  api = new GithubAPI({
    auth: process.env.WEBPACK_JS_ORG_VERCEL_KEY, // this is a personal access token of @chenxsan
  });
  console.log('api is authenticated on vercel');
} else {
  api = new GithubAPI({
    auth: process.env.GITHUB_TOKEN,
  });
  console.log(
    typeof process.env.GITHUB_TOKEN === 'undefined'
      ? 'api is not authenticated'
      : 'api is authenticated locally'
  );
}
export default api;
