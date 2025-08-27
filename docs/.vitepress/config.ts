import { defineConfig } from 'vitepress';

const repositorySlug = process.env.GITHUB_REPOSITORY || '';
const repositoryName = repositorySlug.includes('/') ? repositorySlug.split('/')[1] : repositorySlug;
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// If deploying to <user>.github.io, base must be '/'
const isUserOrOrgSite = repositoryName.endsWith('.github.io');

export default defineConfig({
  base: '/navi_sdk_ros/',
});


