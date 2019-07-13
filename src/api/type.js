import axios from '@/libs/api.request'

export const get_type = (type) => {
  return axios.request({
    url: `/type/${type}`,
    method: 'get'
  })
}
