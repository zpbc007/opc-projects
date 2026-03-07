# OPC Projects

一人公司项目评估仪表盘 - 用于评估和管理个人创业项目的工具。

## 项目简介

OPC Projects 是一个专为独立创业者设计的项目评估和管理工具。它提供了：

- 多维度项目评分系统（产品、开发、营销、运营、乐观视角、悲观视角）
- 直观的卡片视图和表格视图切换
- 深色/浅色主题支持
- 项目搜索和排序功能
- 详细的评分说明和分析

## 功能特性

### 多维度评分

每个项目可以从 6 个维度进行评估：

| 维度 | 说明 |
|------|------|
| 产品 (Product) | 产品可行性和市场契合度 |
| 开发 (Dev) | 技术实现难度和全栈适配度 |
| 营销 (Marketing) | 市场推广和获客能力 |
| 运营 (Ops) | 日常运营复杂度 |
| 乐观视角 (Optimist) | 最优情况下的潜力评估 |
| 悲观视角 (Pessimist) | 最差情况下的风险考量 |

### 视图模式

- **卡片视图** - 交互式卡片展示，适合日常浏览
- **表格视图** - 紧凑的表格展示，适合截图和导出

### 其他功能

- 支持深色/浅色主题切换
- 按名称、创建时间、评分排序
- 项目名称和描述搜索
- 项目详情弹窗展示完整评分

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2 | UI 框架 |
| TypeScript | 5.2 | 类型安全 |
| Vite | 5.0 | 构建工具 |
| CSS Variables | - | 主题系统 |
| Playwright | 1.46 | 截图自动化 |

## 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用（端口可能因占用而变化）。

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录。

## 项目结构

```
opc-projects/
├── index.html              # HTML 入口文件
├── src/
│   ├── App.tsx              # 主应用组件
│   ├── App.css
│   ├── main.tsx             # 入口文件
│   ├── index.css            # 全局样式和 CSS 变量
│   ├── components/          # UI 组件
│   │   ├── Header/          # 头部（搜索、排序、主题）
│   │   ├── ProjectList/     # 列表容器（视图切换）
│   │   ├── ProjectCard/     # 卡片组件
│   │   ├── ProjectTable/    # 表格组件
│   │   ├── ProjectModal/    # 详情弹窗
│   │   ├── StarRating/      # 星级评分
│   │   └── EmptyState/      # 空状态
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useTheme.ts      # 主题管理
│   │   └── useViewMode.ts   # 视图模式检测
│   ├── types/               # TypeScript 类型定义
│   │   └── project.ts       # Project 接口
│   ├── utils/               # 工具函数
│   │   ├── dataLoader.ts    # 数据加载和过滤
│   │   └── format.ts        # 格式化工具
│   └── data/
│       └── db.json          # 项目数据
├── scripts/
│   └── screenshot.js        # 截图脚本
├── images/                  # 截图输出目录
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 使用指南

### 浏览项目

- 打开应用后，默认显示卡片视图
- 点击项目卡片可查看详细信息

### 搜索项目

- 在顶部搜索框输入关键词
- 支持搜索项目名称、描述和洞察

### 排序项目

- 点击排序下拉菜单选择排序方式
- 支持按创建时间、名称、评分排序

### 切换主题

- 点击右上角的主题按钮（系统/浅色/深色三个独立按钮）
- 支持跟随系统、浅色、深色三种模式

### 表格视图

- 在 URL 中添加 `?detail=1` 参数
- 例如：`http://localhost:5173/?detail=1`
- 表格视图显示项目名称、评分、描述和洞察
- 适合截图和导出使用

## 数据格式

项目数据存储在 `src/data/db.json` 文件中。

### Project 数据结构

```typescript
interface Project {
  id: number;                  // 唯一标识
  name: string;                // 项目名称
  description: string;         // 项目描述
  insight: string;             // 市场洞察
  created_at: string;          // 创建时间 (YYYY-MM-DD HH:mm:ss)

  // 评分 (1-10)
  product_score?: number;      // 产品评分
  dev_score?: number;          // 开发评分
  marketing_score?: number;    // 营销评分
  ops_score?: number;          // 运营评分
  optimist_score?: number;     // 乐观评分
  pessimist_score?: number;    // 悲观评分
  final_score?: number;        // 最终评分

  // 评分说明
  product_brief?: string;      // 产品评分说明
  dev_brief?: string;          // 开发评分说明
  marketing_brief?: string;    // 营销评分说明
  ops_brief?: string;          // 运营评分说明
  optimist_brief?: string;     // 乐观评分说明
  pessimist_brief?: string;    // 悲观评分说明
  scored_at?: string;          // 评分时间
}
```

### 添加新项目

编辑 `src/data/db.json`，在数组中添加新项目：

```json
{
  "id": 4,
  "name": "项目名称",
  "description": "项目描述",
  "insight": "市场洞察",
  "created_at": "2026-03-07 10:00:00",
  "product_score": 8,
  "dev_score": 7,
  "marketing_score": 6,
  "ops_score": 5,
  "optimist_score": 8,
  "pessimist_score": 4,
  "final_score": 7,
  "product_brief": "产品评分说明",
  "dev_brief": "开发评分说明",
  "marketing_brief": "营销评分说明",
  "ops_brief": "运营评分说明",
  "optimist_brief": "乐观评分说明",
  "pessimist_brief": "悲观评分说明",
  "scored_at": "2026-03-07 12:00:00"
}
```

> 注意：`id` 必须唯一，建议使用递增数字。

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 构建生产版本 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run screenshot` | 生成截图 |

## 截图工具

项目包含一个自动化截图脚本，使用 Playwright 生成应用截图。

### 使用方法

```bash
npm run screenshot
```

截图将保存在 `images/` 目录，文件名格式为 `YYYY-MM-DD-NNN.png`（如 `2026-03-06-001.png`）。

### 前提条件

首次运行需要安装 Playwright 浏览器：

```bash
npx playwright install chromium
```

## 许可证

MIT License