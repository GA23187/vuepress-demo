module.exports = {
  theme: '', // 主题设置
  base: '/vuepress-demo', // 部署站点的基础路径
  // dest: '', // 打包位置
  head: [['link', { rel: 'icon', href: `/logo.png` }]],
  lang: 'zh-CN',
  title: 'VuePress',
  description: 'Vue 驱动的静态网站生成器',
  themeConfig: {
    // Git 仓库和编辑链接
    repo: 'ga23187/vuepress-demo',
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    // ---end
    algolia: null,
    smoothScroll: true,
    locales: {},
    // navbar: false, // 禁用所有页面的导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' },
        ],
      },
      {
        text: 'Group',
        items: [
          {
            text: 'Group1',
            items: [{ text: 'Chinese', link: '/language/chinese/' }],
          },
          {
            text: 'Group2',
            items: [{ text: 'Chinese', link: '/language/chinese/' }],
          },
        ],
      },
    ],
    sidebar: [['/sidebar/', '自定义sidebar文字'], '/guide/'],
  },
  plugins: [require('./plugin/handleWebp.js')],
  extraWatchFiles: ['.vuepress/config/**'], // 指定额外的需要被监听的文件
}
