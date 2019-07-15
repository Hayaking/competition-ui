import {
  get_role_list
} from '@/api/role'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetRoleList ({ commit }) {
      return new Promise((resolve, reject) => {
        get_role_list().then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
