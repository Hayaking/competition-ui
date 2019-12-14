import axios from '@/libs/api.request'

export const get_self_workload = (pageNum, pageSize) => {
  return axios.request({
    url: `/workload/${pageNum}/${pageSize}`,
    method: 'get'
  })
}
