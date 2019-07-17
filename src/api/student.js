import axios from '@/libs/api.request'

export const get_all_student_by_page = (pageNum, pageSize) => {
  return axios.request({
    url: `/student/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
export const update_student = (student) => {
  return axios.request({
    url: `/student/update`,
    data: student,
    method: 'post'
  })
}
