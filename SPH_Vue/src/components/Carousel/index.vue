<template>
  <div class="swiper-container" :id="list.id" ref="Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入轮播图包
import Swiper from "swiper";

export default {
    name: "Carousel",
    props:['list'],

    watch: {
    // 监听bannerList数据的变化：因为这条数据发生过变化---由空数组变为数组里面有四个元素
        list: {
        //这里必须使用immediate，因为数组是从父组件传过来的从来没有变过
        //所以使用immediate立即监听
        immediate: true,
        handler() {
            // 轮播图获取数据后不能马上初始化swiper，因为v-for遍历结构也需要时间
            // 所以需要使用$nextTick（下次DOM更新循环结束后再执行回调）
            this.$nextTick(() => {
              new Swiper(this.$refs.Swiper, {
                  //direction: 'vertical', // 垂直切换选项
                  loop: true, // 循环模式选项

                  // 自动播放
                  autoplay: true,

                  // 如果需要分页器
                  pagination: {
                  el: ".swiper-pagination",
                  clickable: true, //设置小原店面可以切换
                  },

                  // 如果需要前进后退按钮
                  navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                  },

                  // 如果需要滚动条
                  scrollbar: {
                  el: ".swiper-scrollbar",
                  },
              });
            });
        },
        },
    },

};
</script>

<style scoped>
</style>