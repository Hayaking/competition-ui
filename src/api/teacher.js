import axios from '@/libs/api.request'

export const get_all_teacher = () => {
  return axios.request({
    url: `/teacher`,
    method: 'get'
  })
}

export const get_all_teacher_by_page = (pageNum, pageSize) => {
  return axios.request({
    url: `/teacher/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_teacher_by_group_id = (groupId) => {
  return axios.request({
    url: `/teacher/${groupId}`,
    method: 'get'
  })
}

export const get_lead_teacher_list = () => {
  return axios.request({
    url: `/teacher/role/lead`,
    method: 'get'
  })
}

export const search_teacher_by_page = (key, pageNum, pageSize) => {
  return axios.request({
    url: `/teacher/search/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
