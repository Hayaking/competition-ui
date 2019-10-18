import axios from '@/libs/api.request'

export const get_lead_apply = (pageNum, pageSize) => {
  return axios.request({
    url: `/lead/apply/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const set_lead_apply_state = (flag, joinId) => {
  return axios.request({
    url: `/lead/review/${flag}/${joinId}`,
    method: 'post'
  })
}

export const search_lead = (pageNum, pageSize, key) => {
  return axios.request({
    url: `/lead/apply/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
