import request from '../utils/request.js'

/**
 * 获取tab
 */
export function getHotTabs() {
  return request({
    url: '/hot/tabs'
  })
}

/**
 * 获取列表
 */
export function getHotListFromTabType (type) {
  return request({
    url: '/hot/list',
    data: {
      type
    }
  })
}