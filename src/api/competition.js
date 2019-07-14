import axios from '@/libs/api.request'

export const save_competition = competition => {
  return axios.request({
    url: 'competition',
    data: competition,
    method: 'post'
  })
}

export const get_competition_by_group_id = (pageNum, pageSize, groupId) => {
  return axios.request({
    url: `competition/${pageNum}/${pageSize}/${groupId}`,
    method: 'get'
  })
}

export const get_competition_all = (pageNum, pageSize) => {
  return axios.request({
    url: `competition/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const set_competition_state = (id, state) => {
  return axios.request({
    url: `competition/state`,
    params: { 'id': id, 'state': state },
    method: 'get'
  })
}
