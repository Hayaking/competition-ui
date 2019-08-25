import axios from '@/libs/api.request'

export const create_join = (join) => {
  return axios.request({
    url: `/join`,
    data: join,
    method: 'post'
  })
}
