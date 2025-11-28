# Code Nexus

Code Nexus 是一个基于 VitePress 的文档站点。

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建静态站点
pnpm docs:build
```

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.js    # 配置文件
│   ├── guide/           # 指南部分
│   ├── reference/       # 参考部分
│   └── index.md         # 首页
└── package.json
```

## 部署

该项目配置了 GitHub Actions，当推送到 main 分支时会自动部署到 GitHub Pages。