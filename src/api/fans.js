// // 粉丝管理相关模块

// 获取粉丝列表
import request from '@/utils/request'
export const getFans = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
