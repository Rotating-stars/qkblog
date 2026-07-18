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