// 基于axios封装的请求模块
// baseURL 基准地址
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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

// 导出请求的方法
export default request
