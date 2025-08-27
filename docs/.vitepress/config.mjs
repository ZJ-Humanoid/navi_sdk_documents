import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Navi机器人SDK开发指南',
  description: '这是浙江人形机器人Navi系列的SDK和编程指引文档站点。',
  base: '/navi_sdk_ros/',
  
  themeConfig: {
    sidebar: [
      {
        items: [
          { text: '快速开始', link: '/' },
          {
            text: 'ROS API',
            collapsible: true,
            items: [
              { text: '导图', link: '/markmap_ros_api' },          // 页面
              { text: '文档', link: '/zj_humanoid_ros_api' }, // 同页 H2/H3 锚点
            ]
          },
          {
            text: 'Message Type',
            collapsible: true,
            items: [
              { text: '导图', link: '/markmap_message_type' },          // 页面
              { text: '文档', link: '/zj_humanoid_types' },   // 同页 H2/H3 锚点
            ]
          },
        ]
      }
    ],
    
    outline: { level: [2, 4], label: 'On this page' },
    appearance: false
  },

  // 配置 markmap 支持
  vite: {
    optimizeDeps: {
      include: ['markmap-lib', 'markmap-view']
    }
  }
})
