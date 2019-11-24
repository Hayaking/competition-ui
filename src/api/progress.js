import axios from '@/libs/api.request'

export const save_progress = (progress) => {
  return axios.request({
    url: '/progress',
    data: progress,
    method: 'post'
  })
}

export const update_progress = (progress) => {
  return axios.request({
    url: '/progress/update',
    data: progress,
    method: 'post'
  })
}

export const update_progress_scan_state = (id, name, flag) => {
  return axios.request({
    url: `/progress/${id}/update/scan/${name}/${flag}`,
    method: 'post'
  })
}

export const update_progress_state = (id, state) => {
  return axios.request({
    url: `/progress/${id}/update/state/${state}`,
    method: 'post'
  })
}

export const get_progress_list_by_competition_id = (competitionId) => {
  return axios.request({
    url: `/progress/list/competition/${competitionId}`,
    method: 'get'
  })
}

export const get_progress_list_by_join_id = (joinId) => {
  return axios.request({
    url: `/progress/list/join/${joinId}`,
    method: 'get'
  })
}

export const end_progress = (id) => {
  return axios.request({
    url: `/progress/${id}/end`,
    method: 'post'
  })
}

export const set_progress_result_state = (id, state) => {
  return axios.request({
    url: `/progress/${id}/result/${state}`,
    method: 'post'
  })
}

export const get_need_review_progress_page = (pageNum, pageSize) => {
  return axios.request({
    url: `/progress/review/list/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const review_result = (id, state) => {
  return axios.request({
    url: `/progress/${id}/review/${state}`,
    method: 'post'
  })
}
