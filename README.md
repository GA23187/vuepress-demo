# vuepress

- https://web.huwujie.com/10-vuepress/

> 当前版本 vuepress v1.x
>
> 一些配置可以直接copy https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/.vuepress/config.ts

## 目录结构

> VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。





## 侧边栏

> 配置 `themeConfig.sidebar`

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```

省略 `.md` 拓展名，同时以 `/` 结尾的路径将会被视为 `*/README.md`，这个链接的文字将会被自动获取到（无论你是声明为页面的第一个 header，还是明确地在 `YAML front matter` 中指定页面的标题）。如果你想要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

### 嵌套的标题链接

### 生成侧栏

如果你希望自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏，你可以通过 `YAML front matter` 来实现：

```yaml
---
sidebar: auto
---
```

你也可以通过配置来在所有页面中启用它：

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: 'auto'
  }
}
```

### 禁用侧边栏

```yaml
---
sidebar: false
---
```





## 插件

### 使用插件

在 `.vuepress/config.js` 中做一些配置来使用插件

```js
module.exports = {
  plugins: [
  	// 引入自定义的插件配置 一般就是处理webpack
    require('./my-plugin.js')
  ],
  // 或 npm安装的依赖的插件 插件名以 vuepress-plugin- 开头，你可以使用缩写来省略这个前缀
  plugins: [ 'vuepress-plugin-xx' ]
  // 插件可以通过在配置内的数组中封装名称和选项对象来指定选项：
   plugins: [
    [
      'vuepress-plugin-xxx',
      { /* options */ }
    ]
  ]
  // 或者使用对象的方式
   plugins: {
    'xxx': { /* options */ }
  }
}
```

### **开发插件**

> 一个 VuePress 插件应该是一个 `CommonJS 模块`，因为 VuePress 插件运行在 Node 端。

一个插件应该导出一个普通的 JavaScript 对象（`#1`），如果插件需要接受配置选项，那么它可以是一个返回对象的函数（`#2`），函数接受插件的配置选项为第一个参数、包含编译期上下文的 [ctx](https://vuepress.vuejs.org/zh/plugin/context-api.html) 对象作为第二个参数

```js
// #1
module.exports = {
   // ...
}
// #2
module.exports = (options, ctx) => {
   return {
      // ...
   }
}
```





## 拓展

### 展示pdf



## 部署

### GitHub Pages and Github Actions

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

   > 注意一定要后面带/ 不然生成的html会这样 `<link rel="icon" href="/vuepress-demologo.png">`

2. 创建 [Github access token (opens new window)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token);

3. 在你 github 仓库下，创建一个 [secrets (opens new window)](https://docs.github.com/en/actions/security-guides/encrypted-secrets)，填入刚创建的 `token`

4. 在项目根目录下的 `.github/workflows` 目录（没有的话，请手动创建一个）下创建一个 `.yml` 或者 `.yaml` 文件，如:`vuepress-deploy.yml`;

```yml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: vuepress-deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_REPO: username/repo
        TARGET_BRANCH: master
        BUILD_SCRIPT: yarn && yarn docs:build
        BUILD_DIR: docs/.vuepress/dist
        CNAME: https://www.xxx.com
```

以上文件根据实际情况修改。

详细使用方法，可以看[jenkey2011/vuepress-deploy(opens new window)](https://github.com/jenkey2011/vuepress-deploy/)

## 问题

### 无法加载Webp格式图片解决方法

问题描述

> ./docs/guide/images/base-7.webp 1:5
> Module parse failed: Expecting Unicode escape sequence \uXXXX (1:5)
> You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> (Source code omitted for this binary file)

看问题应该是webpack没有处理webp格式的资源，需要修改下webpack的loader

```js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('url-loader')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .end()
  },
}
```

参考：

- [博客无法加载Webp格式图片解决方法](https://www.meowpass.com/pages/5f4328/)
- [为 Vuepress 增加图片放大功能的几种方法](https://logi.im/front-end/ways-to-add-image-zoom-feature-for-vuepress.html)

