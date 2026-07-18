---
order: 2
---
# 基本配置

## 官方配置

> [!TIP] 官方配置
> 本教程讲的是优化过后的配置，如需官方配置请参照官方文档

<Linkcard url="https://vitepress.dev/zh/reference/site-config" title="VitePress官方配置" description="https://vitepress.dev/zh/reference/site-config" logo="/qkblog/png/vitepress.png"/>

## 优化配置

将所有配置集中在`config.mts`中会让它变得非常拥挤，难以阅读和维护，所以需要拆分成多个文件进行管理

### 前期工作

首先你需要有这样的文件结构，并新建`configs`文件夹和`ts`文件

::: code-group
```explorer [explorer]{4-13}
.
|- docs
|  |- .vitepress
|  |  |- configs        <--configs文件夹
|  |  | |- index.ts     <--统一出口文件
|  |  | |- meta.ts      <--元数据和站点配置
|  |  | |- body.ts      <--主页面配置
|  |  | |- search.ts    <--搜索栏配置
|  |  | |- nav.ts       <--导航栏配置
|  |  | |- navRight.ts  <--导航栏右侧配置
|  |  | |- sidebar.ts   <--左侧边栏配置
|  |  | |- aside.ts     <--右侧边栏配置
|  |  | |- docFooter.ts <--文章结尾配置
|  |  |- theme
|  |  |- cache
|  |  |- config.mts
|  |- api-examples.md
|  |- markdown-examples.md
|  |- index.md
```
:::

然后将对应文件的内容填入

### 统一管理文件

::: code-group
```ts [index.ts]
//统一管理文件
export * from './meta.ts'
export * from './body.ts'
export * from './search.ts'
export * from './nav.ts'
export * from './navRight.ts'
export * from './sidebar.ts'
export * from './aside.ts'
export * from './docFooter.ts'
```
:::

### 元数据和主页面
元数据和站点配置`meta.ts`、主页面配置`body.ts`

::: code-group
```ts [meta.ts]
//元数据和站点配置
export const meta = {
    //当设置为true时，将页面元数据提取到单独的JavaScript块中
    //而不是内联在初始HTML中
    //这使每个页面的HTML负载更小并使页面元数据可缓存
    //从而当站点中有很多页面时可以减少服务器带宽
    metaChunk: true,
    //如果计划将站点部署到https://foo.github.io/qkblog/
    //那么应该将base设置为'/qkblog/'
    base: '/qkblog/', 
    lang: "zh-CN", //本地语言
    title: "青空的Blog", //标题
    // titleTemplate: ':title | 青空的Blog', //自定义网页标签
    description: "这里是青空的Blog", //站点描述
    head: [
        //网站图标，从./public文件夹导入
        ['link', { rel: 'icon', href: '/qkblog/favicon.ico' }]
    ], //向网站<head>标签中加入
}
```

```ts [body.ts]
//主页面配置
export const body = {
    logo: '/logo.png', //左上角logo，从./public文件夹导入
    footer: {
        message: '在 MIT 许可下发布',
        copyright: `版权所有 © 1970-1-1 --> 今日 青空`,
    }, //主页页尾自定义
    notFound: {
        title: "当前页面未找到",
        quote: "请返回有效页面",
        linkText: "返回首页",
    }, //404页面自定义
    externalLinkIcon: true, //是否在markdown中的外部链接后显示↗
    //sitemap: {
    //    hostname: 'https://rotating-stars.github.io/qkblog/',
    //}, // 站点地图，填入你部署的网址
}
```
:::

### 导航栏相关

搜索配置`search.ts`、导航栏配置`nav.ts`、导航栏右侧配置`navRight.ts`

::: code-group

```ts [search.ts]
//搜索配置
import type { DefaultTheme } from 'vitepress'
//官方文档：https://vitepress.dev/zh/reference/default-theme-search
export const search: DefaultTheme.Config['search'] =
{
    provider: 'local',
    options: {
        locales: {
            root: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档',
                    },
                    modal: {
                        displayDetails: '显示详细列表',
                        noResultsText: '无相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                            selectText: '选择',
                            selectKeyAriaLabel: '输入',
                            navigateText: '切换',
                            navigateUpKeyAriaLabel: '上箭头',
                            navigateDownKeyAriaLabel: '下箭头',
                            closeText: '关闭',
                            closeKeyAriaLabel: 'Esc',
                        }
                    }
                }
            }
        }
    }
}
```

```ts [nav.ts]
import type { DefaultTheme } from 'vitepress'
//导航栏配置
//数组内部的内容可由你完全自定义
//官方文档：https://vitepress.dev/zh/reference/default-theme-nav#navigation-links
export const nav: DefaultTheme.Config['nav'] =
[
    { text: '主页', link: '/' },
    { text: '知识库', activeMatch: '/知识库/', items: [
        { text: 'VitePress', link: '/知识库/VitePress', activeMatch: '/知识库/VitePress' },
        { text: 'Vue3', link: '/知识库/Vue3', activeMatch: '/知识库/Vue3' },
    ]},
    { text: '日常', activeMatch: '/日常/', items: [
        { text: '日常1', link: '/日常/日常1', activeMatch: '/日常/VitePress' },
        { text: '日常2', link: '/日常/日常2', activeMatch: '/日常/Vue3' },
    ]},
    { text: '妙妙工具', link: '/妙妙工具.html' },
    { text: '友链', link: '/友链/' },
]
```

```ts [navRight.ts]
//导航栏右侧配置
import type { DefaultTheme } from 'vitepress'
// 深色模式相关
export const darkMode = {
    //默认true由用户决定，dark默认深色，false无法切换，force-dark强制深色
    appearance: true,
    //移动端深色模式开关的标题
    darkModeSwitchLabel: "浅色/深色",
    //悬停时显示的深色模式开关标题
    darkModeSwitchTitle: "深色",
    //悬停时显示的浅色模式开关标题
    lightModeSwitchTitle: "浅色",
}
// 社交链接，默认图标来自：https://simpleicons.org/
export const socialLinks: DefaultTheme.Config['socialLinks'] =
[
    { icon: 'maildotru', link: 'mailto:你的邮箱' },
    { icon: 'bilibili', link: 'https://space.bilibili.com/你的bilibili页面' },
    { icon: 'github', link: 'https://github.com/你的github页面' },
]
```
:::

### 侧边栏和文章
右侧边栏配置`aside.ts`、文章末尾配置`docFooter.ts`

::: code-group
```ts [aside.ts]
//右侧边栏配置
export const aside = {
    //移动端返回顶部按钮的标题
    returnToTopLabel: "回到顶部",
    //右侧侧边栏菜单标题
    outlineTitle: "页面导航",
    //右侧侧边栏显示层级h1-h6
    outline: [2, 6],
}
```

```ts [docFooter.ts]
//文章末尾配置
export const docFooter = {
    //最后更新时间
    lastUpdated: {
        text: '最后更新于',
        formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium',
        },
    },
    //文档页尾翻页标题
    docFooter: {
        prev: '上一篇',
        next: '下一篇',
    },
    //编辑本页
    // editLink: {
    //   pattern: 'https://github.com/自己的仓库/:path', 
    //   text: '在GitHub编辑本页'
    // },
}
```
:::

### 左侧边栏

至于左侧边栏`sidebar.ts`，我使用了自动侧边栏插件`vitepress-sidebar`

> [!TIP] 未使用自动侧边栏的可以查询官方文档
> https://vitepress.dev/zh/reference/default-theme-sidebar#sidebar

::: code-group
```ts [sidebar.ts]
// 左侧边栏
export const vitePressSidebarOptions = [
    {
        documentRootPath: 'docs',
        scanStartPath: '知识库/VitePress',
        resolvePath: '/知识库/VitePress/',
        collapsed: true,
        includeRootIndexFile: true,
        includeFolderIndexFile: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: false,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 999,
    },
    {
        documentRootPath: 'docs',
        scanStartPath: '知识库/Vue3',
        resolvePath: '/知识库/Vue3/',
        collapsed: true,
        includeRootIndexFile: true,
        includeFolderIndexFile: false,
        useTitleFromFrontmatter: true,
        useFolderLinkFromIndexFile: false,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 999,
    },
    {
        documentRootPath: 'docs',
        scanStartPath: '日常',
        resolvePath: '/日常/',
        collapsed: true,
        includeRootIndexFile: false,
        includeFolderIndexFile: false,
        //manualSortFileNameByPriority: ['日常1','日常2','日常3'],
        useFolderLinkFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 999,
    },
];
```

```ts [选项说明]
//vitepress-sidebar文档：
//https://vitepress-sidebar.cdget.com/zhHans/guide/options
{  
	//这是.vitepress目录所在的路径，
	//如果项目根目录中文档所在的文件夹是/docs
	//则该选项的值应设为docs或/docs
    documentRootPath: 'docs',
    scanStartPath: 'qkblog', //扫描指定目录的文件
    resolvePath: '/qkblog/', //为地址栏添加路径名
    includeRootIndexFile: true, //显示根目录的index.md文件
    includeFolderIndexFile: true, //显示子目录的index.md文件
    useFolderLinkFromIndexFile: true, //使分组标题链接到对应的index.md文件
    //以文件的Frontmatter中的title的值为标题，获取不到默认文件名
    useTitleFromFrontmatter: true,
    //子文件夹中的文件以文件的Frontmatter中的title的值为标题，获取不到默认文件名
    useFolderTitleFromIndexFile: true,
    sortMenusByFrontmatterOrder: true, //按frontmatter的order属性对菜单项排序
    //如果为false,则创建菜单时所有分组都处于展开状态
    //如果为true,则创建菜单时所有分组都处于折叠状态
    collapsed: true,
    //当该侧边栏有多文件夹时，可以使用该属性进行排序
    manualSortFileNameByPriority: ['日常1','日常2','日常3'],
},
```
:::

### config.mts
最后就是`config.mts`文件的配置了

如果你还没有安装`vitepress-sidebar`，请执行以下命令安装它（未使用则无需安装）

::: code-group
```shell [pnpm]
pnpm i -D vitepress-sidebar
```

```shell [npm]
npm i -D vitepress-sidebar
```

```shell [yarn]
yarn add -D vitepress-sidebar
```
:::

::: code-group
```ts [config.mts]
import { defineConfig } from 'vitepress'
//自动侧边栏
import { withSidebar } from "vitepress-sidebar"
//配置导入
import { meta, search, nav, darkMode, socialLinks } from './configs/index'
import { body, vitePressSidebarOptions, aside, docFooter } from './configs/index'

const vitePressConfigs = {
    // vite配置
    vite: {
        plugins: [],
    },
    ...meta, //站点元数据和配置相关
    //文档配置
    themeConfig: {
        ...body, //主页面相关
        search, //搜索相关
        nav, //页头导航菜单相关
        ...darkMode, //深色模式相关
        socialLinks, //右上社交链接相关
        sidebarMenuLabel: "目录", //移动端左侧侧边栏菜单标题
        ...aside, //右侧边栏
        ...docFooter, //文章末尾相关
    }
};

export default defineConfig(
    withSidebar(vitePressConfigs, vitePressSidebarOptions)
);
```

```ts [未使用自动侧边栏的.mts]{25}
import { defineConfig } from 'vitepress'
//配置导入
import { meta, search, nav, darkMode, socialLinks } from './configs/index'
import { body, vitePressSidebarOptions, aside, docFooter } from './configs/index'

export default defineConfig({
	// vite配置
    vite: {
        plugins: [],
    },
    ...meta, //站点元数据和配置相关
    //文档配置
    themeConfig: {
        ...body, //主页面相关
        search, //搜索相关
        nav, //页头导航菜单相关
        ...darkMode, //深色模式相关
        socialLinks, //右上社交链接相关
        sidebarMenuLabel: "目录", //移动端左侧侧边栏菜单标题
        vitePressSidebarOptions, //左侧边栏
        ...aside, //右侧边栏
        ...docFooter, //文章末尾相关
    }
});
```
:::

### 关闭功能

如果你想要关闭某个功能，直接把它注释掉就可以了，无论是在`configs`文件夹还是在`config.mts`中

