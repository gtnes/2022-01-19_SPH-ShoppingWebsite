import {reqGetUserAddressInfo} from "@/api"

const state = {}

const mutations = {}

const actions = {
    // 获取用户地址
    async getUserAddressInfo({commit}){
        let result = await reqGetUserAddressInfo()
        console.log(result);
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}