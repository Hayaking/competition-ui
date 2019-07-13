import axios from '@/libs/api.request'

export const save_competition = competition => {
  return axios.request({
    url: 'competition',
    data: competition,
    method: 'post'
  })
}

export const get_by_group_id = (pageNum, pageSize, groupId) => {
  return axios.request({
    url: `competition/${pageNum}/${pageSize}/${groupId}`,
    method: 'get'
  })
}
