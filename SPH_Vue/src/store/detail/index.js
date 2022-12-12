import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodsInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}

const mutations = {
    GETGOODSINFO(state, goodsInfo){
        state.goodsInfo = goodsInfo
    }
}

const actions = {
    // 获取产品信息
    async getGoodsInfo({commit}, skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODSINFO', result.data)
        }
    },

    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit}, {skuId, skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if(result.code==200){
            return 'ok'
        }else{
            // 请求失败
            return Promise.reject(new Error('无响应，加入购物车失败'))
        }
    }
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },

    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },

    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    },

    price(state){
        return state.goodsInfo.price || ''
    },

}

export default{
    state,
    mutations,
    actions,
    getters
}