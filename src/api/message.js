import axios from '@/libs/api.request'

export const get_message = () => {
  return axios.request({
    url: `/message`,
    method: 'get'
  })
}
