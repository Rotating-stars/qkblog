import DefaultTheme from "vitepress/theme";
import MyLayout from './components/MyLayout.vue'
import MNavLinks from './components/MNavLinks.vue'
import ArticleMetadata from "./components/ArticleMetadata.vue"
import Linkcard from "./components/Linkcard.vue"
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'virtual:group-icons.css' //代码组样式
import './style/index.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({app}) {
    app.use(ElementPlus);
    app.component('MNavLinks' , MNavLinks);
    app.component('ArticleMetadata' , ArticleMetadata);
    app.component('Linkcard' , Linkcard);
  },
};