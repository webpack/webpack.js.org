import { Octokit as GithubAPI } from '@octokit/rest';
import { createActionAuth } from '@octokit/auth-action';
let api;
if (process.env.CI && process.env.CI === 'true') {
  const auth = createActionAuth();
  const authentication = await auth();
  api = new GithubAPI({
    auth: authentication.token,
  });
} else {
  api = new GithubAPI();
}
export default api;
