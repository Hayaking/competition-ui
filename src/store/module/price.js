import { create_price } from '@/api/price'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleCreatePrice ({ commit }, { price, certificate }) {
      return new Promise((resolve) => {
        create_price(price, certificate).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
