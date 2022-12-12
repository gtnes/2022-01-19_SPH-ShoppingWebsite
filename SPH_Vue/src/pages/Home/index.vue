<template>
  <div>
    <!-- 三级联动全局组件 三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>

    <!-- 使用非全局组件 -->
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list='floor'></Floor>
    <Brand/>
  </div>
</template>

<script>
// 引入其余的非全局组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from "vuex";

export default {
    name:'',
    // 注册非全局组件
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand,
    },

    mounted(){
      // 派发action，将数据仓储在仓库中
      this.$store.dispatch('getFloorList')
      
      // // 获取用户信息在首页展示
      // this.$store.dispatch('getUserInfo')
    },

    computed: {
      // 获取仓库中的数据
      ...mapState({
        floorList: (state) => state.home.floorList,
      }),
    },
}
</script>

<style scoped>

</style>