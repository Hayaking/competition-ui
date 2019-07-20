import axios from '@/libs/api.request'

export const get_teacher_group = () => {
  return axios.request({
    url: 'teacherGroup/list',
    method: 'get'
  })
}
export const invite_teacher_member = (groupId, account) => {
  return axios.request({
    url: `teacherGroup/invite/${groupId}/${account}`,
    method: 'post'
  })
}
