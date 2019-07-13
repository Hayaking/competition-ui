import axios from '@/libs/api.request'

export const login = (type, account, password) => {
  return axios.request({
    url: `login/${type}`,
    params: { 'account': account, 'password': password },
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

export const getUserInfo = (type) => {
  return axios.request({
    url: `info/${type}`,
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const sign = (account, password) => {
  return axios.request({
    url: 'sign',
    params: { 'account': account, 'password': password },
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}
