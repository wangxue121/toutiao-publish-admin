// 文章相关请求模块
import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => { // 这里的params是形参
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用params 设置
    // headers 参数使用heasers 设置
    params // 当属性名和属性值相同是可以省略一个
  })
}
