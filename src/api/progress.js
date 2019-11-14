import axios from '@/libs/api.request'

export const save_progress = (progress) => {
  return axios.request({
    url: '/progress',
    data: progress,
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
