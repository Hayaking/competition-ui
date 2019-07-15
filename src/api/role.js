import axios from '@/libs/api.request'

export const get_role_list = () => {
  return axios.request({
    url: 'role/list',
    method: 'get'
  })
}
