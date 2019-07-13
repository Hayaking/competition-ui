import {
  get_type
} from '@/api/type'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetType ({ commit, rootState }, { type }) {
      return new Promise((resolve, reject) => {
        get_type(type).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
