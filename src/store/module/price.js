import {
  create_price,
  get_price_by_join_in_progress_id,
  get_price_page_by_student,
  get_recently_price
} from '@/api/price'

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
    },
    handleGetPriceByStudent ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_price_page_by_student(pageNum, pageSize).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleRecentlyPrice ({ commit }) {
      return new Promise((resolve) => {
        get_recently_price().then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
