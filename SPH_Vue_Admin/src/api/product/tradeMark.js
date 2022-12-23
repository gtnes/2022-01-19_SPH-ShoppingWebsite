import request from '@/utils/request'

// 获取品牌列表
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
	method: 'get'
})