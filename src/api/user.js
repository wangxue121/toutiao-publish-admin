/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data用来设置post请求体
    data: data
    // 登录成功
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 属性名和属性值要看接口要求
    // 属性名：Authorization ,接口文档要求
    // 属性值： Bearer空格token数据
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5NDA2OTcsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.7SlZXYY-QhFJ9hKRaOVIRYIO5dxQPYJlGweFuUhH5-Q'
    }
  })
}
// 修改用户信息
