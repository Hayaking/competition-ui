import axios from '@/libs/api.request'

export const get_permission = roleId => {
  return axios.request({
    url: `permission/${roleId}`,
    method: 'get'
  })
}

export const get_all_permission = () => {
  return axios.request({
    url: `permission`,
    method: 'get'
  })
}

export const add_role_permission = (roleId, permissionId) => {
  return axios.request({
    url: `permission/${roleId}/${permissionId}`,
    method: 'post'
  })
}
export const delete_role_permission = (roleId, permissionId) => {
  return axios.request({
    url: `permission/${roleId}/${permissionId}`,
    method: 'DELETE'
  })
}

export const add_permission = (permissionName) => {
  return axios.request({
    url: `permission`,
    params: { 'permissionName': permissionName },
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}
export const delete_permission = (permissionId) => {
  return axios.request({
    url: `permission/${permissionId}`,
    method: 'DELETE'
  })
}

export const get_id = (menuId) => {
  return axios.request({
    url: `permission/menu/${menuId}`,
    method: 'get'
  })
}

export const save_permission_menu = (menuId, permissionId) => {
  return axios.request({
    url: `permission/menu/${menuId}/${permissionId}`,
    method: 'post'
  })
}
