import axios from '@/libs/api.request'

export const get_route = (type) => {
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
// insert or update
export const save_menu = (menu) => {
  return axios.request({
    url: `menu`,
    data: menu,
    method: 'post'
  })
}
