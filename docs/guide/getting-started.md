# 开始使用

本指南将帮助您快速上手使用 Code Nexus。

## 先决条件

在开始之前，请确保您已安装以下软件：

- Node.js (版本 14 或更高)
- pnpm (推荐) 或 npm

## 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/code-nexus.git

# 进入项目目录
cd code-nexus

# 安装依赖
pnpm install
```

## 本地开发

```bash
# 启动开发服务器
pnpm docs:dev

# 构建静态站点
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

## 项目结构

```
.
├── docs/
│   ├── .vitepress/
│   │   └── config.js    # 配置文件
│   ├── guide/           # 指南文档
│   ├── tools/           # 工具集文档
│   ├── resources/       # 学习资源文档
│   └── index.md         # 首页
└── package.json
```

## 下一步

- 探索[工具集](../tools/)获取实用工具
- 查看[学习资源](../resources/)获取更多学习材料