import axios from '@/libs/api.request'

export const create_join = (group, list, works, join) => {
  return axios.request({
    url: `/join`,
    data: { group: group, list: list, works: works, join: join },
    method: 'post'
  })
}

export const delete_join = (id) => {
  return axios.request({
    url: `/join/${id}`,
    method: 'delete'
  })
}

export const get_join_list = (pageNum, pageSize) => {
  return axios.request({
    url: `/join/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_simple_join_list_by_group_id = (groupId) => {
  return axios.request({
    url: `/join/group/${groupId}`,
    method: 'get'
  })
}

export const get_join_list_by_progress_Id = (pageNum, pageSize, progressId) => {
  return axios.request({
    url: `/join/progress/${progressId}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const set_enter_state = (inProgressId, flag) => {
  return axios.request({
    url: `/enter/${inProgressId}/${flag}`,
    method: 'post'
  })
}

export const review_join_in_progress = (id, reviewState, editState) => {
  return axios.request({
    url: `/join/progress/review/${id}/${reviewState}/${editState}`,
    method: 'post'
  })
}
