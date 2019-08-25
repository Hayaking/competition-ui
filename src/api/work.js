import axios from '@/libs/api.request'

export const create_works = (works) => {
  return axios.request({
    url: `/works`,
    data: works,
    method: 'post'
  })
}
