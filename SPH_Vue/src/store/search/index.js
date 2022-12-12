// search模块的小仓库
import { reqGetSearchInfo } from "@/api";

// 仓库存储数据的地方
const state = {
    searchList:{},
};

// 修改state数据的唯一手段
const mutations = {
    // 搜索模块
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
};

// 处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取search模块数据 params为需要传递的参数
    async getSearchList({commit}, params={}){
        // reqGetSearchInfo至少传递一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST', result.data)
        }
    }
}; 

// 理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
// 将服务器返回的数据进行简化，让组件调用数据的时候更方便
// 组件内获取仓库getters内的数据用mapGetters，而且不用区分仓库
const getters = {
    // 这里的state是当前仓库的state
    goodList(state){
        return state.searchList.goodsList || []  // 如果网络错误不能返回underfind而是返回一个空数组
    },

    trademarkList(state){
        return state.searchList.trademarkList || []
    },

    attrsList(state){
        return state.searchList.attrsList || []
    }

};

// 对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}