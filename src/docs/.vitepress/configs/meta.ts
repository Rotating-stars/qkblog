//元数据和站点配置
export const meta = {
    //当设置为true时，将页面元数据提取到单独的JavaScript块中，而不是内联在初始HTML中
    //这使每个页面的HTML负载更小并使页面元数据可缓存，从而当站点中有很多页面时可以减少服务器带宽
    metaChunk: true,
    base: '/qkblog/', //如果计划将站点部署到https://foo.github.io/qkblog/ ，那么应该将base设置为'/qkblog/'
    lang: "zh-CN", //本地语言
    title: "青空的Blog", //标题
    // titleTemplate: ':title | 青空的Blog',
    description: "这里是青空的Blog", //站点描述
    head: [
        ['link', { rel: 'icon', href: '/qkblog/favicon.ico' }] //网站图标
    ], //向网站<head>标签中加入
}