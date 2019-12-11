import axios from '@/libs/api.request'

export const create_works = (works) => {
  return axios.request({
    url: `/works`,
    data: works,
    method: 'post'
  })
}

export const get_works_list_by_group_id = (groupId) => {
  return axios.request({
    url: `/works/group/${groupId}`,
    method: 'get'
  })
}

export const get_works_by_id = (id) => {
  return axios.request({
    url: `/works/${id}`,
    method: 'get'
  })
}
