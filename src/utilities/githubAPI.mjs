import { Octokit as GithubAPI } from '@octokit/rest';
import { createActionAuth } from '@octokit/auth-action';
/** @type import('@octokit/rest').Octokit */
let api;
if (process.env.CI && process.env.CI === 'true') {
  const auth = createActionAuth();
  const authentication = await auth();
  api = new GithubAPI({
    auth: authentication.token,
  });
  console.log('api is authenticated');
} else {
  api = new GithubAPI();
  console.log('api is not authenticated');
}
export default api;
