import { create_works } from '@/api/work'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleCreateWorks ({ commit }, { works }) {
      return new Promise((resolve, reject) => {
        create_works(works).then(res => {
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
