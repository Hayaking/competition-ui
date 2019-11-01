import axios from '@/libs/api.request'

export const get_teacher_group = () => {
  return axios.request({
    url: 'teacherGroup/list',
    method: 'get'
  })
}

export const get_teacher_group_by_page = (pageNum, pageSize) => {
  return axios.request({
    url: `teacherGroup/list/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_teacher_group_all = (pageNum, pageSize) => {
  return axios.request({
    url: `teacherGroup/all/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_teacher_group_inviting = () => {
  return axios.request({
    url: 'teacherGroup/inviting',
    method: 'get'
  })
}

export const invite_teacher_member = (groupId, teacherId) => {
  return axios.request({
    url: `teacherGroup/invite/${groupId}/${teacherId}`,
    method: 'post'
  })
}

export const invite_student_member = (groupId, list) => {
  return axios.request({
    url: `studentGroup/addMembers/${groupId}`,
    data: list,
    method: 'post'
  })
}

export const agree_teacher_group_invite = (groupId) => {
  return axios.request({
    url: `teacherGroup/agree/${groupId}`,
    method: 'post'
  })
}

export const refuse_teacher_group_invite = (groupId) => {
  return axios.request({
    url: `teacherGroup/refuse/${groupId}`,
    method: 'post'
  })
}

export const create_teacher_group = (group) => {
  return axios.request({
    url: `teacherGroup/create`,
    data: group,
    method: 'post'
  })
}

export const create_student_group = (groupName) => {
  return axios.request({
    url: `studentGroup/create/${groupName}`,
    method: 'post'
  })
}

export const set_teacher_group_state = (id, flag) => {
  return axios.request({
    url: `teacherGroup/state/${id}/${flag}`,
    method: 'post'
  })
}

export const get_student_group = (pageNum, pageSize) => {
  return axios.request({
    url: `studentGroup/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const search_teacher_group = (key, pageNum, pageSize) => {
  return axios.request({
    url: `/teacherGroup/search/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const exit_teacher_group = (groupId) => {
  return axios.request({
    url: `/teacherGroup/exit/${groupId}`,
    method: 'delete'
  })
}
export const delete_teacher_group = (groupId) => {
  return axios.request({
    url: `/teacherGroup/${groupId}`,
    method: 'delete'
  })
}

export const get_teacher_by_group_id = (groupId) => {
  return axios.request({
    url: `teacherGroup/${groupId}/teachers`,
    method: 'get'
  })
}

export const remove_teacher_from_group = (groupId, teacherId) => {
  return axios.request({
    url: `/teacherGroup/${groupId}/${teacherId}`,
    method: 'delete'
  })
}

export const get_student_group_member_list = (groupId) => {
  return axios.request({
    url: `/studentGroup/${groupId}/members`,
    method: 'get'
  })
}
