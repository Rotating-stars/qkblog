import type { DefaultTheme } from 'vitepress'
// 导航栏
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
// 社交链接，图标来自：https://simpleicons.org/
export const socialLinks: DefaultTheme.Config['socialLinks'] =
[
	{ icon: 'maildotru', link: 'mailto:1694800621@qq.com' },
	{ icon: 'bilibili', link: 'https://space.bilibili.com/293751618' },
	{ icon: 'github', link: 'https://github.com/Rotating-stars/qkblog' },
]