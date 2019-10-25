import axios from '@/libs/api.request'

export const submit_progress_list = (progresses) => {
  return axios.request({
    url: '/progress/list',
    data: progresses,
    method: 'post'
  })
}
