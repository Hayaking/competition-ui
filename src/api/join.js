import axios from '@/libs/api.request'

export const create_join = (join) => {
  return axios.request({
    url: `/join`,
    data: join,
    method: 'post'
  })
}

export const get_join_list = (pageNum, pageSize) => {
  return axios.request({
    url: `/join/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
