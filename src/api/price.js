import axios from '@/libs/api.request'

export const create_price = (form) => {
  return axios.request({
    url: `price`,
    data: form,
    method: 'post'
  })
}

export const get_price_by_join_in_progress_id = (joinInProgressId) => {
  return axios.request({
    url: `/price/joinInProgress/${joinInProgressId}`,
    method: 'get'
  })
}

export const get_price_page_by_student = (pageNum, pageSize) => {
  return axios.request({
    url: `/price/student/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
