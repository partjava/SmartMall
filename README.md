# 📱 纯个人期末作业

基于 Vue 3 + Vue Router + Vuex + Element Plus 的手机电商前端项目。

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

![首页预览](screenshots/home.jpg)

## 📦 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.2.13 | 前端框架 |
| Vue Router | ^4.0.3 | 路由管理 |
| Vuex | ^4.0.0 | 状态管理 |
| Element Plus | ^2.7.4 | UI 组件库 |
| Vue CLI | ~5.0.0 | 构建工具 |

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run serve

# 3. 浏览器访问
http://localhost:8080
```

## 📁 项目结构

```
src/
├── assets/                # 静态资源
│   ├── common.css         # 公共样式
│   ├── phone*.jpg         # 商品图片
│   ├── ziji*.jpg          # 轮播图/装饰图
│   └── *.svg              # 图标
├── components/            # 公共组件（预留）
├── data/
│   └── products.js        # 商品数据 + 搜索/筛选函数
├── router/
│   └── index.js           # 路由配置 + 登录守卫 + 404
├── store/
│   └── index.js           # Vuex 状态管理
├── views/
│   ├── Index.vue          # 主布局（导航 + 轮播 + 侧栏 + 底部）
│   ├── Login.vue          # 登录页（左右分栏设计）
│   ├── Register.vue       # 注册页（左右分栏设计）
│   ├── List.vue           # 首页商品列表
│   ├── Details.vue        # 商品详情页
│   ├── Fenlei.vue         # 分类页（带分类筛选）
│   ├── Shopcart.vue       # 购物车
│   ├── Order.vue          # 我的订单
│   ├── AboutView.vue      # 推荐页
│   └── NotFound.vue       # 404 页面
├── App.vue                # 根组件（页面动画 + 版权水印）
├── main.js                # 入口文件
└── .env                   # 环境变量配置
```

## 🎯 功能模块

### 用户模块
- ✅ 登录（表单验证 + 跳回来源页 + 自动填充注册用户名）
- ✅ 注册（密码一致性校验 + 账号名长度校验）
- ✅ 退出登录
- ✅ 路由守卫（未登录自动跳转登录页）
- ✅ 404 页面兜底

### 商品模块
- ✅ 首页商品列表（10 款手机）
- ✅ 商品详情页（通过 ID 查询，刷新不丢失）
- ✅ 模糊搜索（支持标题、描述、品牌关键词）
- ✅ 分类筛选（华为/荣耀/苹果/三星/OPPO/vivo/魅族/其他）
- ✅ 分类 + 搜索联动
- ✅ 左侧导航可点击筛选

### 购物车模块
- ✅ 加入购物车（自动去重，重复商品累加数量）
- ✅ 购物车角标（导航栏实时显示数量）
- ✅ 修改商品数量
- ✅ 勾选结算（显示选中商品合计）
- ✅ 单个删除 / 清空购物车

### 订单模块
- ✅ 结算后自动生成订单
- ✅ 订单列表查看
- ✅ 删除订单

### 体验优化
- ✅ 页面切换淡入淡出动画
- ✅ 响应式布局（适配手机/平板/桌面）
- ✅ 登录注册左右分栏设计
- ✅ 路由切换自动回到顶部

### 版权保护
- ✅ 页面水印（myxm © 2024）
- ✅ 禁止右键菜单
- ✅ 禁止复制/剪切
- ✅ 禁止图片拖拽
- ✅ 禁止 F12 / Ctrl+Shift+I / Ctrl+U
- ✅ HTML meta 版权声明
- ✅ 页面底部版权信息

## 🗂 状态管理 (Vuex)

```
store/index.js
├── state
│   ├── isLoggedIn      # 登录状态
│   ├── username        # 用户名
│   ├── cart            # 购物车数组
│   ├── orders          # 订单数组
│   └── activeCategory  # 当前选中的分类
├── getters
│   ├── cartCount       # 购物车商品总数
│   └── cartTotal       # 购物车总价
├── mutations
│   ├── LOGIN / LOGOUT
│   ├── ADD_TO_CART / REMOVE_FROM_CART / CLEAR_CART
│   ├── UPDATE_CART_NUM
│   ├── CHECKOUT
│   ├── REMOVE_ORDER
│   ├── SET_CATEGORY / CLEAR_CATEGORY
│   └── INIT_CART / INIT_ORDERS
└── actions
    ├── login
    ├── logout
    ├── addToCart
    └── checkout
```

所有数据通过 `localStorage` 持久化，刷新页面不丢失。

## 🔐 路由守卫

需要登录才能访问的页面（购物车、订单）配置了 `meta.requiresAuth`：

```js
{
  path: 'Shopcart',
  component: Shopcart,
  meta: { requiresAuth: true }  // 未登录自动跳转登录页
}
```

登录成功后会自动跳回之前被拦截的页面。

## 🔍 搜索功能

搜索支持模糊匹配，匹配范围包括：
- 商品标题
- 商品描述
- 品牌类型

例如输入"华为"可匹配到所有华为品牌手机，输入"拍照"可匹配到描述中包含"拍照"的商品。

## 🌐 环境变量

项目支持通过 `.env` 文件配置环境变量：

```bash
# .env（开发环境）
VITE_APP_TITLE=手机购买网站
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_ENV=development
```

生产环境配置在 `.env.production` 中。

## 📝 开发命令

```bash
npm run serve    # 启动开发服务器（热更新）
npm run build    # 构建生产版本
npm run lint     # 代码检查
```

## ⚠️ 注意事项

1. 本项目为前端演示项目，登录/注册为模拟逻辑，无真实后端
2. 商品数据存储在 `src/data/products.js`，如需新增商品在此文件修改
3. 所有用户数据存储在浏览器 `localStorage` 中
4. 清除浏览器数据会导致登录状态和购物车数据丢失
5. 版权保护措施仅限前端层面，无法完全防止专业抓取

## 📄 开源协议

本项目采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议：

- ✅ **允许**：学习、个人使用、非商业性改编和分享
- ❌ **禁止**：商业用途（未经授权不得用于盈利目的）
- ⚠️ **要求**：转载或改编需注明出处，并以相同方式分享

Copyright © 2024 myxm. All Rights Reserved.

### 素材声明

- **手机产品图片**：商品名称仅供演示，产品图片来自 [Unsplash](https://unsplash.com/)（免费商用许可证）
- **轮播图/装饰图**：来自 [Unsplash](https://unsplash.com/)（免费商用许可证）
- **第三方登录图标**：使用 Feather Icons 风格的通用图标，非品牌商标
- **项目中的品牌名称**（华为、苹果、三星等）仅用于功能演示，不代表任何商业合作
