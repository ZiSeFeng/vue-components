## 0.1. wechat-demo
**技术栈** vue + vuex + vue-router + axios + vant

## 0.2. Project setup
```
npm install
```

### 0.2.1. Compiles and hot-reloads for development
```
npm run serve
```

### 0.2.2. Compiles and minifies for production
```
npm run build
```

### 0.2.3. Run your tests
```
npm run test
```

### 0.2.4. Lints and fixes files
```
npm run lint
```

### 0.2.5. Run your end-to-end tests
```
npm run test:e2e
```

### 0.2.6. Run your unit tests
```
npm run test:unit
```
### 0.2.7. Run your mock data
```
npm run mock 
```
打开本地的 http://localhost:3000/dev-api/user/info

## 0.3. 项目目录
├── examples                   // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── icons                  // 项目所有 svg icons
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor 公共库
│   ├── views                  // view 页面
│   ├── docs                   // markdowm文件
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── public                     // public
│   ├──index.html              // html 文件
│   ├──favicon.ico             // favicon文件
├── packages                   // 自定义封装组件
│   ├──color-picker            // 颜色选择器
│   ├──index.js                // 组件安装
├── .browserslistrc            // 浏览器安装版本
├── .env.development           // development环境下配置
├── .env.site                  // site环境下配置
├── .env.production            // production环境下配置
├── .eslintrc.js               // eslint编译规则
└── package.json               // package.json