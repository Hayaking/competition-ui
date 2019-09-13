import axios from '@/libs/api.request'

export const get_all_student_by_page = (pageNum, pageSize) => {
  return axios.request({
    url: `/student/${pageNum}/${pageSize}`,
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

export const search_student_by_page = (key, pageNum, pageSize) => {
  return axios.request({
    url: `/student/search/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
