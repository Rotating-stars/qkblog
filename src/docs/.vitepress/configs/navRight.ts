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
// 社交链接，图标来自：https://simpleicons.org/
export const socialLinks: DefaultTheme.Config['socialLinks'] =
[
	{ icon: 'maildotru', link: 'mailto:1694800621@qq.com' },
	{ icon: 'bilibili', link: 'https://space.bilibili.com/293751618' },
	{ icon: 'github', link: 'https://github.com/Rotating-stars/qkblog' },
]