// 基于axios封装的请求模块
// baseURL 基准地址
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'

// 非组件模块可以这样加载使用 element 的 message 提示组件
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基准地址
  // 定义后端请求的原始数据的处理
  // 参数data 是后端返回的原始数据 （未经处理的json格式字符串）
  transformResponse: [function (data) {
    // console.log(data)
    // return JSON.parse(data)
    // 后端返回的可能不是JSON格式，如果不是 JSON.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log(err)
      // 如果转换失败了，则进入这里，把数据直接返回
      return data
    }
  }]
})

// 请求拦截器
// 因为我们创建了request所以是request
request.interceptors.request.use(
  // 所有请求都会经过这里
  // config 是当前请求的配置信息对象
  function (config) {
    // 我们可以在允许请求发出之前定制统一的业务功能
    // 例如设置统一的token
    // 把json格式的字符串转成原来的数据对象
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有用户登录信息，则统设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 当执行这里的代码后请求才可以发出去
    return config
  },
  // 请求失败会经过这里
  function (error) {
    return Promise.reject(error)
  })

// 响应拦截器
// // Add a response interceptor
// request.interceptors.response.use(function (response) {
//   // 所有响应码为 2xx 的响应都会进入这里

//   // response 是响应处理
//   // 注意：一定要把响应结果 return，否则真正发请求的位置拿不到数据
//   return response
// }, function (error) {
//   // 任何超出 2xx 的响应码都会进入这里
//   if (error.response && error.response.status === 401) {
//     // 跳转到登录页面
//     // 清除本地存储中的用户登录状态
//     window.localStorage.removeItem('user')
//     router.push('/login')
//   }

//   return Promise.reject(error)
// })

// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // 所有响应码为 2xx 的响应都会进入这里

  // response 是响应处理
  // 注意：一定要把响应结果 return，否则真正发请求的位置拿不到数据
  return response
}, function (error) {
  const { status } = error.response
  // 任何超出 2xx 的响应码都会进入这里
  // if (error.response && error.response.status === 401) {
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地存储中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态无效，请重新登录')
  } else if (status === 403) {
    // token 未携带或已过期
    Message({
      type: 'warning',
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }

  return Promise.reject(error)
})
// 导出请求的方法
export default request
