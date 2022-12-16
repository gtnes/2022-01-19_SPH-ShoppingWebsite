import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--注册为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)  // 参数（全局组件名称，哪一个组件）
// 注册全局组件 Carousel
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页器注册为全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
// 路由 第1步：引入路由
import router from '@/router'
// 仓库 引入仓库
import store from '@/store'
// 引入mockServe.js
import '@/mock/mockServe'
// 引入Swiper样式 swiper v5.0.1
import 'swiper/css/swiper.css'
// 统一接收api里所有请求函数
import * as API from '@/api'

// 按需引入Element UI组件
import {Button,MessageBox} from 'element-ui'
// Element UI组件注册为全局组件
Vue.component(Button.name, Button)
// Element UI弹窗 注册在原型尚
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this // 此处的this是大写的VM
    Vue.prototype.$API = API
  },
  // 路由 第2步：注册路由(底下的写法是kv一致省略V)
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  store // 仓库 注册仓库：组件实例身上会多一个$store属性
}).$mount('#app')
