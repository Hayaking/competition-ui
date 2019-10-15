import { save_budget_list } from '@/api/budget'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleSaveBudgets ({ commit }, { budgets }) {
      return new Promise((resolve, reject) => {
        save_budget_list(budgets).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
