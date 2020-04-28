// 素材请求相关模块

import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般上传文件接口 都要求吧请求头中的Content-Type 设置为multipart/form-data,但是我们使用axios上传文件的时候不需要手动设置，只需要给data一个FormData对象即可   new FormData()
    data
  })
}

// 获取素材列表
export const getImages = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

// 删除图片素材
export const deleteImage = imageId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}

// 收藏图片素材
export const collectImage = (imageId, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageId}`,
    data: {
      collect
    }
  })
}
