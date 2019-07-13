import {
  getRoute
} from '@/api/data'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    getRoutes ({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        console.info('!!!!!!!!!!!!!')
        getRoute(rootState.user.type).then(res => {
          console.info(res.data)
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
