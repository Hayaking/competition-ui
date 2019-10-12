import axios from '@/libs/api.request'

export const login = (token) => {
  return axios.request({
    url: `login`,
    data: token,
    method: 'post'
    // headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export const get_user_info = () => {
  return axios.request({
    url: `info`,
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: 'logout',
    method: 'get'
  })
}

export const sign = (student) => {
  return axios.request({
    url: 'sign',
    data: student,
    method: 'post'
  })
}
