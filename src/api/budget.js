import axios from '@/libs/api.request'
import qs from 'qs'

export const save_budget_list = (budgets) => {
  return axios.request({
    url: 'budget/list',
    data: JSON.stringify(budgets),
    method: 'post',
    headers: { 'content-type': 'application/json' }
  })
}
