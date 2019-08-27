import axios from '@/libs/api.request'

export const save_competition = competition => {
  return axios.request({
    url: 'competition',
    data: competition,
    method: 'post'
  })
}
export const delete_competition = (id) => {
  return axios.request({
    url: `/competition/${id}`,
    method: 'delete'
  })
}

export const get_competition_by_group_id = (pageNum, pageSize, groupId) => {
  return axios.request({
    url: `competition/${pageNum}/${pageSize}/${groupId}`,
    method: 'get'
  })
}

export const get_competition5_by_type_id = (typeId) => {
  return axios.request({
    url: `/competition/${typeId}`,
    method: 'get'
  })
}

export const get_competition_all = (pageNum, pageSize) => {
  return axios.request({
    url: `competition/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const set_competition_state = (id, flag) => {
  return axios.request({
    url: `competition/state/${id}/${flag}`,
    method: 'post'
  })
}

export const set_competition_enter_state = (id, flag) => {
  return axios.request({
    url: `competition/enterState/${id}/${flag}`,
    method: 'post'
  })
}
