import {
  getRoute,
  get_all_route
} from '@/api/routers'

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
    },
    handleGetAllRoute ({ commmit }) {
      return new Promise((resolve, reject) => {
        get_all_route().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
