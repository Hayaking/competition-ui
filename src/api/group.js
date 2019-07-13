import axios from '@/libs/api.request'

export const get_teacher_group = () => {
  return axios.request({
    url: 'teacherGroup/list',
    method: 'get'
  })
}
