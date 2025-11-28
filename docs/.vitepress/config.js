export default {
  title: "Code Nexus",
  description: "Code Nexus Documentation",
  base: "/code-nexus/",
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '参考', link: '/reference/' }
    ],
    
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '介绍', link: '/guide/' },
          { text: '快速开始', link: '/guide/quick-start' }
        ]
      },
      {
        text: '参考',
        items: [
          { text: 'API', link: '/reference/api' },
          { text: '配置', link: '/reference/config' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/code-nexus' }
    ]
  }
}