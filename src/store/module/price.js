import { create_price, get_price_by_join_in_progress_id } from '@/api/price'
import { get_join_list_by_progress_Id } from '@/api/join'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleCreatePrice ({ commit }, { form }) {
      return new Promise((resolve) => {
        create_price(form).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleGetPriceByJipId ({ commit }, { joinInProgressId }) {
      return new Promise((resolve) => {
        get_price_by_join_in_progress_id(joinInProgressId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
