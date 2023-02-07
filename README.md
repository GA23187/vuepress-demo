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

- https://www.meowpass.com/pages/5f4328/