// 配置路由的地方
// 第1步：引入插件
import Vue from "vue";
import VueRouter from "vue-router";

// 第2步：使用插件
Vue.use(VueRouter)

import store from "@/store";

// 第3步：引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 第4步：配置路由
let router = new VueRouter({
    // 路由配置
    routes: [
        // 个人中心
        {
            path: '/center',
            component: Center,
            meta: { show: true },
            // 二级路由组件
            children:[
                {
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myorder',
                }
            ]
        },
        // 首页
        {
            path: '/home',
            component: Home,
            meta: { show: true }
        },
        // 详情页
        {
            path: '/detail/:skuid?',
            component: Detail,
            meta: { show: true }
        },
        // 加入购物车
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        // 购物车
        {
            path: '/shopcart',
            component: ShopCart,
            meta: { show: true }
        },
        // 搜索页
        {
            // params：用:keyword占位,如果想指定params参数可传可不传需要在占位后面加问号:keyword?
            path: '/search/:keyword?',
            component: Search,  // 展示Search这个组件
            name: 'search',
            meta: { show: true }
        },
        // 结算页
        {
            path: '/trade',
            component: Trade,
            meta: { show: true }
        },
        // 支付页
        {
            path: '/pay',
            component: Pay,
            meta: { show: true }
        },
        // 支付成功页
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true }
        },
        // 登录页
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        // 重定向：访问/，立马重定向到首页
        {
            path: '*',
            redirect: '/home'
        },
    ],

    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫 前置守卫
router.beforeEach(async (to, from, next) => {
    // to：可以获取到你要跳转到那个路由
    // from：可以获取到从那个路由来
    // next：放行函数 [直接放行 next()，放行到指定路由 next('/login'), 中断当前导航 next(false)]
    // 用户登陆后才会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name

    // 用户已经登录
    if (token) {
        // 去登录页或者注册页
        if (to.path == '/login' || to.path == '/register') {
            // 阻止去登录或注册页,跳转到home
            next('/home')
        } else {
            // 登陆了，去其它页面
            if (name) {
                // 如果有用户信息就放行
                next()
            } else {
                try {
                    // 没有用户信息 获取用户信息后再放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了，用户信息获取失败，重新登录
                    // 清除用户信息后再回到登录界面
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录
        next()
    }
})

export default router