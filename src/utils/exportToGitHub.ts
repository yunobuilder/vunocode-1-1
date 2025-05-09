import { Octokit } from 'octokit';
export async function exportToGitHub(owner: string, repo: string, path: string, content: string) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    message: 'Add generated file',
    content: Buffer.from(content).toString('base64')
  });
}
