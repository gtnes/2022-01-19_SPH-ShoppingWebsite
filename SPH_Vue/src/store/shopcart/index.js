import {reqGetShopCartList, reqDeleteShopCartById, reqUpdataCheckedByid} from '@/api'

const state = {
    cartList:[]
}

const mutations = {
    GETSHOPCARTLIST(state, cartList){
        state.cartList = cartList
    }
}

const actions = {
    // 获取购物车数据
    async GetShopCartList({commit}){
        let result = await reqGetShopCartList()
        if(result.code == 200){
            commit('GETSHOPCARTLIST', result.data)
        }
    },
    // 删除购物车商品
    async deleteShopCartBySkuId({commit}, skuId){
        let result = await reqDeleteShopCartById(skuId)
        if(result.code == 200){
            return '成功'
        }else{
            return Promise.reject(new Error('删除购物车商品失败！'))
        }
    },

    // 修改商品选中状态
    async updataCheckedByid({commit}, {skuId, isChecked}){
        let result = await reqUpdataCheckedByid(skuId, isChecked)
        if(result.code == 200){
            return '成功'
        }else{
            return Promise.reject(new Error('修改选中状态错误！'))
        }
    },

    // 删除选中商品
    deleteAllCheckedCart({dispatch, getters}){
        // deleteAllCheckedCart可以传context，context相当于一个小仓库，包含了mutations getters state, dispatch(派发action)
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            // 只删除勾选的商品
            let promise = item.isChecked==1 ? dispatch("deleteShopCartBySkuId", item.skuId) : ''
            PromiseAll.push(promise)
        })
        // Promise.all(arr)，如果这个数组里面都成功则返回成功，如果有一个失败则返回失败
        return Promise.all(PromiseAll)
    },

    // 全选 反选商品
    updateAllCartIsChecked({dispatch, getters}, isChecked){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch("updataCheckedByid", {skuId:item.skuId, isChecked:isChecked})
            PromiseAll.push(promise)
        })
        // Promise.all(arr)，如果这个数组里面都成功则返回成功，如果有一个失败则返回失败
        return Promise.all(PromiseAll)
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}