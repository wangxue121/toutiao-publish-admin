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
  // 把json格式的字符串转成原来的数据对象
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 属性名和属性值要看接口要求
    // 属性名：Authorization ,接口文档要求
    // 属性值： Bearer空格token数据
    // 已经在拦截器设置统一的了，所以这就不用写了,所有需要授权的都不用写了
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}

// 修改用户信息
// export const updataUserProfile = data => {
//   return request({
//     method: 'PATCH',
//     url: ' /mp/v1_0/user/profile',
//     data
//   })
// }
