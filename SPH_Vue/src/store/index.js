import Vue from "vue";
import Vuex from 'vuex';
// 需要使用插件一次
Vue.use(Vuex);
// 引入小仓库
import home from './home';
import search from './search';
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";

// 对外暴露store类额一个实例
export default new Vuex.Store({
    // 实现vuex仓库模块式开发存储数据
    modules:{
        home,  // 注册小仓库
        search,
        detail,
        shopcart,
        user,
    }
})