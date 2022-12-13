import {reqGetUserAddressInfo, reqOrderInfo} from "@/api"

const state = {
    userAddress:[],
    orderInfo:{}
}

const mutations = {
    GETUSERADDRESS(state, userAddress){
        state.userAddress = userAddress
    },

    GETORDERINFO(state, orderInfo){
        state.orderInfo = orderInfo
    }
}

const actions = {
    // 获取用户地址信息
    async getUserAddressInfo({commit}){
        let result = await reqGetUserAddressInfo()
        if(result.code==200){
            commit('GETUSERADDRESS', result.data)
        }
    },

    // 获取订单交易页商品清单
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if (result.code==200) {
            commit('GETORDERINFO', result.data)
        }
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}