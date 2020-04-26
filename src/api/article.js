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

// 获取频道列表 没有请求参数
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    // 接口路径中有 :XX 格式的 ，就是需要传递路径参数的
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 发布文章
// draft 是否存为草稿 true是存为草稿
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    // 接口路径中有 :XX 格式的 ，就是需要传递路径参数的
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 修改文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'put',
    // 接口路径中有 :XX 格式的 ，就是需要传递路径参数的
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

// 获取指定文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    // 接口路径中有 :XX 格式的 ，就是需要传递路径参数的
    url: `/mp/v1_0/articles/${articleId}`
  })
}
