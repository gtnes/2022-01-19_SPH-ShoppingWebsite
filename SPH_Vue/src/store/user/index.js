// 登录与注册模块

import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout, reqGetUserAddressInfo} from '@/api'
import {setToken, getToken, removeToken} from '@/utils/token'

const state={
    code:'',
    token: getToken(),
    userInfo:{},
}

const mutations={
    GETCODE(state, code){
        state.code = code
    },

    // token
    USERLOGIN(state, token){
        state.token = token
    },

    // 用户信息
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    },

    // 清除本地数据
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const actions={
    // 获取验证码
    async getCode({commit}, phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('获取验证码错误！'))
        }
    },

    // 用户注册
    async userRegister({commit}, data){
        let result = await reqUserRegister(data)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('注册失败！'))
        }
    },

    // 用户登录
    async userLogin({commit}, data){
        let result = await reqUserLogin(data)
        if(result.code==200){
            commit('USERLOGIN', result.data.token)
            // 将token存储到本地存储中
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('登录失败！'))
        }
    },

    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('用户信息获取失败！'))
        }
    },

    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        console.log(result);
        if(result.code==200){
            // action里面不能操作state，只能提交mutation修改
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('退出失败！'))
        }
    },

    // 获取用户地址列表
    async getUserAddressList({commit}){
        let result = await reqGetUserAddressInfo()
        console.log(result);
    }
}
const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}
