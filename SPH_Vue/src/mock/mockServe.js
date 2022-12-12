// 01 引入mockjs
import Mock from 'mockjs'
// 02 引入json数据
import banner from './banner.json'
import floor from './floor.json'

// 03 mock数据
Mock.mock('/mock/banner', {code:200, data:banner})  //(请求地址, 请求地址相应的数据)
Mock.mock('/mock/floor', {code:200, data:floor})