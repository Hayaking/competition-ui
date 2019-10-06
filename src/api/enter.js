import axios from '@/libs/api.request'

export const get_enter_list_by_competition_id = (pageNum, pageSize, competitionId) => {
  return axios.request({
    url: `/enter/${competitionId}/list/${pageNum}/${pageSize}`,
    method: 'get'
  })
}

export const export_enter_excel = (competitionId) => {
  return axios.request({
    url: `/enter/${competitionId}/export`,
    method: 'get'
  })
}
