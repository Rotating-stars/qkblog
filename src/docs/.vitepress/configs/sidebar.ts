// 左侧边栏
export const vitePressSidebarOptions = [
	/*	{	
			//这是.vitepress目录所在的路径,如果项目根目录中文档所在的文件夹是 /docs，则该选项的值应设为 docs 或 /docs。
			documentRootPath: 'docs',
			//扫描指定目录的文件
			scanStartPath: 'zmxy',
			//为地址栏添加路径名
			resolvePath: '/zmxy/',
			//显示根目录的index.md文件
			includeRootIndexFile: true,
			//显示子目录的index.md文件
			includeFolderIndexFile: true,
			//使用分组标题链接
			useFolderLinkFromIndexFile: true,
			//以文件的Frontmatter中的title的值为标题，获取不到默认文件名
			useTitleFromFrontmatter: true,
			//子文件夹以文件的Frontmatter中的title的值为标题，获取不到默认文件名
			useFolderTitleFromIndexFile: true,
			//按frontmatter的order属性对菜单项排序。
			sortMenusByFrontmatterOrder: true,
			//如果为false,则创建菜单时所有分组都处于展开状态。如果为true,则创建菜单时所有分组都处于折叠状态。
			collapsed: true,
		}, */
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
		//manualSortFileNameByPriority: ['1','2','3'],
		useFolderLinkFromIndexFile: true,
		sortMenusByFrontmatterOrder: true,
		frontmatterOrderDefaultValue: 999,
	},
];