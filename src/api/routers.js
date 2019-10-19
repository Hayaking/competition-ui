import axios from '@/libs/api.request'

export const get_route = () => {
  return axios.request({
    url: `menu`,
    method: 'get'
  })
}

export const get_all_route = () => {
  return axios.request({
    url: `menu/all`,
    method: 'get'
  })
}

export const get_menu_by_role_id = (roleId) => {
  return axios.request({
    url: `menu/role/${roleId}`,
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

export const set_role_and_menu = (roleId, menu1Id, menu2Id, flag) => {
  return axios.request({
    url: `menu/${roleId}/${menu1Id}/${menu2Id}/${flag}`,
    method: 'post'
  })
}
export const set_role_and_menu1 = (roleId, menu1Id, flag) => {
  return axios.request({
    url: `menu/${roleId}/${menu1Id}/${flag}`,
    method: 'post'
  })
}
