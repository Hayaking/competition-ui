import axios from '@/libs/api.request'

export const invite_student_member = (groupId, list) => {
  return axios.request({
    url: `studentGroup/addMembers/${groupId}`,
    data: list,
    method: 'post'
  })
}

export const create_student_group = (groupName) => {
  return axios.request({
    url: `studentGroup/create/${groupName}`,
    method: 'post'
  })
}

export const get_student_group = (pageNum, pageSize) => {
  return axios.request({
    url: `studentGroup/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_student_group_member_list = (groupId) => {
  return axios.request({
    url: `/studentGroup/${groupId}/members`,
    method: 'get'
  })
}
