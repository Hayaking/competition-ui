import axios from '@/libs/api.request'

export const save_competition_holder = holder => {
  return axios.request({
    url: 'competition',
    data: holder,
    method: 'post'
  })
}

export const get_competition_by_id = (id) => {
  return axios.request({
    url: `/competition/${id}`,
    method: 'get'
  })
}

export const get_simple_competition_list_by_group_id = (groupId) => {
  return axios.request({
    url: `/competition/group/${groupId}`,
    method: 'get'
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
    url: `/competition/rank/${typeId}`,
    method: 'get'
  })
}

export const get_competition_all = (pageNum, pageSize) => {
  return axios.request({
    url: `competition/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const get_competition_pass_all = (pageNum, pageSize) => {
  return axios.request({
    url: `competition/pass/${pageNum}/${pageSize}`,
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

export const search_competition = (key, pageNum, pageSize) => {
  return axios.request({
    url: `/competition/judge/search/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
export const search_pass_competition = (key, pageNum, pageSize) => {
  return axios.request({
    url: `/competition/pass/search/${key}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
export const download_competition_word = (competitionId) => {
  return axios.request({
    url: `/download/${competitionId}`,
    method: 'post',
    responseType: 'blob'
  })
}
export const download_competition_budget_word = (competitionId) => {
  return axios.request({
    url: `/download/budget/${competitionId}`,
    method: 'post',
    responseType: 'blob'
  })
}
