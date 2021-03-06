import axios from '@/libs/api.request'

export const get_role_list = () => {
  return axios.request({
    url: 'role/list',
    method: 'get'
  })
}
export const get_student_role = (account) => {
  return axios.request({
    url: `student/role/${account}`,
    method: 'get'
  })
}

export const add_student_role = (account, roleId) => {
  return axios.request({
    url: `student/role/${account}/${roleId}`,
    method: 'post'
  })
}

export const delete_student_role = (id, roleId) => {
  return axios.request({
    url: `student/role/${id}/${roleId}`,
    method: 'delete'
  })
}

export const get_teacher_role = (account) => {
  return axios.request({
    url: `teacher/${account}/role`,
    method: 'get'
  })
}

export const add_teacher_role = (id, roleId) => {
  return axios.request({
    url: `teacher/role/${id}/${roleId}`,
    method: 'post'
  })
}

export const delete_teacher_role = (id, roleId) => {
  return axios.request({
    url: `teacher/role/${id}/${roleId}`,
    method: 'delete'
  })
}
export const get_self_role_list = () => {
  return axios.request({
    url: 'role/list/self',
    method: 'get'
  })
}

export const get_user_page_by_role = (id, pageNum, pageSize) => {
  return axios.request({
    url: `/role/${id}/user/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
