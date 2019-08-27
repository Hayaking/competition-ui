import { get_message } from '@/api/message'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleGetMessage ({ commit }) {
      return new Promise((resolve, reject) => {
        get_message().then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          } else {
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
