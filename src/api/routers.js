import axios from '@/libs/api.request'

export const getRoute = (type) => {
  return axios.request({
    url: `menu/${type}`,
    method: 'get'
  })
}
export const get_all_route = () => {
  return axios.request({
    url: `menu`,
    method: 'get'
  })
}
