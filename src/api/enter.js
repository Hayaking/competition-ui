import axios from '@/libs/api.request'

export const get_enter_competition = (id) => {
  return axios.request({
    url: `/competition/enter/${id}`,
    method: 'get'
  })
}
