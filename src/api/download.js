import axios from '@/libs/api.request'

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

export const download_enter_list_excel = (competitionId, progressId) => {
  return axios.request({
    url: `/download/${competitionId}/${progressId}/enter/list`,
    method: 'post',
    responseType: 'blob'
  })
}

export const download_result_word = (progressId) => {
  return axios.request({
    url: `/download/result/${progressId}`,
    method: 'post',
    responseType: 'blob'
  })
}
