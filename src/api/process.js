import axios from '@/libs/api.request'

export const create_process = (process) => {
  return axios.request({
    url: '/process',
    data: process,
    method: 'post'
  })
}

export const get_process_list_by_join_id = (pageNum, pageSize, competitionId) => {
  return axios.request({
    url: `/process/${competitionId}/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
