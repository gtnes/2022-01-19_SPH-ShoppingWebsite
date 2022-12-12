<template>
  <div>
    <!-- 组件使用 第3步：使用header组件 -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登录、注册时候隐藏Footer -->
    <!-- 路由组件显示与隐藏 方法1：此方法如果需要配置大量路由的时候不适用，所以推荐使用路由元信息方法 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <!-- 路由组件显示与隐藏 方法2：使用路由元信息 路由中的meta属性 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 组件使用 第1步：引入组件
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components:{
    // 组件使用 第2步：注册组件
    Header,
    Footer
  },
  mounted(){
    // 派发aciton，获取商品分类的三级列表的数据
    // this.$store.dispatch() 是用来传值给vuex的mutation改变state
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
