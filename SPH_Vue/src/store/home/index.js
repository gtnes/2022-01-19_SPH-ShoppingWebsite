import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

// home模块的小仓库

// 仓库存储数据的地方
const state = {
    // state默认数据要与返回数据对应
    // 第2步：定义数据
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    // floor组件的数据
    floorList:[],
};

// 修改state数据的唯一手段
const mutations = {
    // 第3步：处理数据 state其实就是vuex中的state属性，categoryList为传过来的值
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    
    // banner
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },

    // Floor
    GETFLOORLIST(state, floorList){
        state.floorList = floorList
    }
};

// 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 第1步：处理请求 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({commit}){
        // 向服务器发送请求
        let result = await reqCategoryList()
        if(result.code==200){
            // 通知mutations修改数据
            commit('CATEGORYLIST',result.data) // 方法名和新的值
        }
    },

    // 获取首页轮播图的数据
    async getBannerList({commit}){
        // 向服务器发送请求
        let result = await reqGetBannerList()
        if(result.code==200){
            // 通知mutations修改数据
            commit('GETBANNERLIST',result.data) // 方法名和新的值
        }
    },

    // 获取floor数据
    async getFloorList({commit}){
        let result = await reqGetFloorList()
        if(result.code==200){
            commit('GETFLOORLIST', result.data)
        }
    }
}; 

// 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}