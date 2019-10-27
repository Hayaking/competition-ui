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
    url: `/progress/competition/${competitionId}`,
    method: 'get'
  })
}
