import axios from '@/libs/api.request'

export const get_all_student_by_page = (pageNum, pageSize) => {
  return axios.request({
    url: `/student/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_student_by_id = (id) => {
  return axios.request({
    url: `/student/id/{id}`,
    method: 'get'
  })
}

export const is_exist = (list) => {
  return axios.request({
    url: `/student/exist`,
    data: list,
    method: 'post'
  })
}

export const insert_or_update_student = (student) => {
  return axios.request({
    url: `/student`,
    data: student,
    method: 'post'
  })
}

export const update_student_info = (student) => {
  return axios.request({
    url: `/student/info`,
    data: student,
    method: 'post'
  })
}

export const search_student_by_page = (key, pageNum, pageSize) => {
  return axios.request({
    url: `/student/search/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_top5_price_student = () => {
  return axios.request({
    url: `/student/price/top5`,
    method: 'get'
  })
}
