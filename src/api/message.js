import axios from '@/libs/api.request'

export const get_message = () => {
  return axios.request({
    url: `/message`,
    method: 'get'
  })
}

export const set_read_message = (id) => {
  return axios.request({
    url: `/message/${id}`,
    method: 'post'
  })
}
