import { defineConfig } from 'vitepress'
//自动侧边栏
import { withSidebar } from "vitepress-sidebar"
//Element Plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//代码组图标
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
//RSS订阅
import { RSSOptions, RssPlugin } from 'vitepress-plugin-rss'
//永久链接
import { usePostsFor } from './theme/utils/permalink';
//配置
import { meta } from './configs/index'
import { search, nav, darkMode, socialLinks } from './configs/index'
import { body, vitePressSidebarOptions, aside, docFooter } from './configs/index'

const rewrites = await usePostsFor([
        '知识库/Vitepress',
        '知识库/Vue3'
    ], 'docs', false);

const baseUrl = 'https://rotating-stars.github.io/qkblog/'
const RSS: RSSOptions = {
	title: '代码',
	baseUrl,
	copyright: '版权所有 © 2026-7-13 --> 今日 青空, 代码',
}

const vitePressConfigs = {
	// vite配置
	vite: {
		plugins: [
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
			groupIconVitePlugin({
				customIcon: {
					explorer: localIconLoader(import.meta.url, '../public/svg/explorer.svg'),
				},
			}), // svg图标：https://icon-sets.iconify.design/
			RssPlugin(RSS),
		],
	},
	// markdown配置
	markdown: {
		lineNumbers: true,
		image: {
    		lazyLoading: true //开启图片懒加载
    	},
		config: (md) => {
			md.use(groupIconMdPlugin); //代码组图标
    		md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
    		    let htmlResult = slf.renderToken(tokens, idx, options);
    		    if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
    		    return htmlResult;
    		}
    	},
	},
	...meta, //站点元数据和配置相关
	rewrites,
	//文档配置
	themeConfig: {
		//主页面相关
		...body,
		//搜索相关
		search,
		//深色模式相关
		...darkMode,
		//页头导航菜单相关
		nav,
		//右上社交链接相关
		socialLinks,
		//移动端左侧侧边栏菜单标题
		sidebarMenuLabel: "目录",
		//右侧边栏
		...aside,
		...docFooter,
	}
};

export default defineConfig(withSidebar(vitePressConfigs, vitePressSidebarOptions));