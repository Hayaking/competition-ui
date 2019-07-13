import axios from '@/libs/api.request'

export const save_competition = competition => {
  return axios.request({
    url: 'competition',
    data: competition,
    method: 'post'
  })
}
