import { defineConfig } from 'vitepress';

const repositorySlug = process.env.GITHUB_REPOSITORY || '';
const repositoryName = repositorySlug.includes('/') ? repositorySlug.split('/')[1] : repositorySlug;
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// If deploying to <user>.github.io, base must be '/'
const isUserOrOrgSite = repositoryName.endsWith('.github.io');

export default defineConfig({
  title: 'Navi机器人SDK开发指南',
  description: '这是浙江人形机器人Navi系列的SDK和编程指引文档站点。',
  base: '/navi_sdk_documents/',

  themeConfig: {
    sidebar: [
      {
        items: [
          { text: '快速开始', link: '/' },
          {
            text: 'ROS API',
            items: [
              { text: '导图', link: '/markmap_ros_api' },
              { text: '文档', link: '/zj_humanoid_ros_api' },
            ]
          },
          {
            text: 'Message Type',
            items: [
              { text: '导图', link: '/markmap_message_type' },
              { text: '文档', link: '/zj_humanoid_types' },
            ]
          },
        ]
      }
    ],

    outline: { level: [2, 3], label: 'On this page' },

  },

  vite: {
    optimizeDeps: {
      include: ['markmap-lib', 'markmap-view']
    }
  }
});


