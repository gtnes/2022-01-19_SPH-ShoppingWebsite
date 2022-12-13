// 当前换个模块：API进行统一管理

import requests from "./request";
// 引入mock请求
import mockRequest from './mockRequest '


// 三级联动接口  /api/product/getBaseCategoryList  get  无参数
export const reqCategoryList = () => {
    // 发请求：axios发请求返回结果是Promise对象
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

// 获取home首页轮播图接口 mock
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据 mock
export const reqGetFloorList = () => mockRequest.get('/floor')

// 获取搜索模块数据 地址:/api/list 方式：post 需要传参
// 当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data:params
})

// 获取产品详情信息接口 /api/item/{ skuId }  方式get
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get',
})

// 将产品添加到购物车中或者更新某一个产品的数据  /api/cart/addToCart/{ skuId }/{ skuNum }  方式 post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})

// 获取购物车列表数据接口
export const reqGetShopCartList = () => requests({
    url: '/cart/cartList',
    method: 'get',
})

// 删除购物车商品
export const reqDeleteShopCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改购物车商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdataCheckedByid = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码 /api/user/passport/sendCode/{phone}  方式get
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 用户注册 /api/user/passport/register  方式：POST
export const reqUserRegister = (data) => requests({
    url:'/user/passport/register',
    method:'post',
    data:data
})

// 用户登录  /api/user/passport/login  方式post
export const reqUserLogin = (data) => requests({
    url:'/user/passport/login',
    method:'post',
    data:data
})

// token校验 获取用户登录信息 /api/user/passport/auth/getUserInfo
// token通过请求头带给api
export const reqUserInfo = () => requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get',
})

// 退出登录
export const reqLogout = () => requests({
    url:'/user/passport/logout',
    method:'get',
})

// 获取用户地址 /api/user/userAddress/auth/findUserAddressList  方式get
export const reqGetUserAddressInfo = () => requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

// 获取订单交易页商品清单 /api/order/auth/trade
export const reqOrderInfo = () => requests({
    url:"/order/auth/trade",
    method:"get"
})

// 提交订单  /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:"post",
    data:data
})