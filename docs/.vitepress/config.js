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
      { text: '📚 HTML 教程', link: '/html/' },
      { text: '💻 JS/TS 教程', link: '/javascript/' },
      { text: '🐹 Go 语言', link: '/go/' },
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
      ],
      '/html/': [
        {
          text: 'HTML 教程',
          items: [
            { text: '简介', link: '/html/index' },
            { text: 'HTML 基础', link: '/html/basics' },
            { text: 'HTML 表单', link: '/html/forms' },
            { text: 'HTML5 新特性', link: '/html/html5' },
            { text: 'HTML APIs 和 DOM 操作', link: '/html/apis' },
            { text: '最佳实践', link: '/html/best-practices' }
          ]
        }
      ],
      '/javascript/': [
        {
          text: 'JavaScript 和 TypeScript 教程',
          items: [
            { text: '简介', link: '/javascript/index' },
            { text: 'JavaScript 基础', link: '/javascript/js-basics' },
            { text: 'JavaScript 进阶', link: '/javascript/js-advanced' },
            { text: 'ES6+ 新特性', link: '/javascript/es6-plus' },
            { text: 'DOM 操作', link: '/javascript/dom' },
            { text: 'TypeScript 基础', link: '/javascript/ts-basics' },
            { text: 'TypeScript 进阶', link: '/javascript/ts-advanced' },
            { text: '最佳实践', link: '/javascript/best-practices' }
          ]
        }
      ],
      '/go/': [
        {
          text: 'Go 语言教程',
          items: [
            { text: '简介', link: '/go/index' },
            { text: 'Go 语言基础', link: '/go/basics' },
            { text: 'Go 语言进阶', link: '/go/advanced' },
            { text: 'Go Web 编程', link: '/go/web' },
            { text: 'Go 微服务', link: '/go/microservices' },
            { text: 'Go 包管理和依赖注入', link: '/go/dependencies' },
            { text: 'Go 测试策略', link: '/go/testing' },
            { text: 'Go 部署和运维', link: '/go/deployment' },
            { text: 'Go 最佳实践', link: '/go/best-practices' }
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