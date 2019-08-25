import { create_join } from '@/api/join'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleCreateJoin ({ commit }, { join }) {
      return new Promise((resolve, reject) => {
        create_join(join).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
