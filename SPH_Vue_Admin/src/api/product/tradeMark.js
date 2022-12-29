import request from '@/utils/request'

// 获取品牌列表
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

// 添加品牌post: /admin/product/baseTrademark/save 携带参数：品牌名称，品牌logo
//修改品牌put: /admin/product/baseTrademark/update 携带三个参数：id、品牌名称、品牌1ogo
//切记：对于修改某一个品牌的操作，前端携带的参数需要带上id，你需要告诉服务器修改的是哪一个品牌
export const reqAddorUpdateTradeMark = (tradeMark) => {
    // 如果带给服务器的参数有id，标明是修改
    if (tradeMark.id) {
        // 修改品牌
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        })
    } else {
        // 新增品牌
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }
}

// 删除品牌
export const reqDeleteTradeMark = (id) => request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
})