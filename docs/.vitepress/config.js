export default {
  // 必须替换为您的 GitHub 仓库名称，例如：'/code-nexus/'
  base: '/code-nexus/', 

  title: 'Code Nexus',
  description: '文档、工具集与学习资源的中央枢纽。',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }] // 如果您有 logo 文件
  ],
  // 忽略死链接检查
  ignoreDeadLinks: true,
  
  themeConfig: {
    logo: '/logo.svg', // 如果您有 logo 文件
    siteTitle: 'Code Nexus',
    
    // 导航栏配置
    nav: [
      { text: '📚 文档中心', link: '/guide/' },
      { text: '🛠️ 工具集', link: '/tools/' },
      { text: '🎓 学习资源', link: '/resources/' }
    ],

    // 侧边栏配置示例
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '简介', link: '/guide/index' },
            { text: '开始使用', link: '/guide/getting-started' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '实用工具',
          items: [
            { text: 'JSON 格式化', link: '/tools/json-formatter' },
            { text: 'JSON 验证', link: '/tools/json-validator' },
            { text: 'Base64 编解码', link: '/tools/base64-converter' },
            { text: 'URL 编解码', link: '/tools/url-converter' },
            { text: '时间戳转换', link: '/tools/timestamp-converter' },
            { text: '时区转换', link: '/tools/timezone-converter' },
            { text: '正则表达式测试', link: '/tools/regex-tester' },
            { text: '哈希计算', link: '/tools/hash-calculator' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/weic70902-dev/code-nexus' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Code Nexus'
    }
  }
}