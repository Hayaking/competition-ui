import { create_join , get_join_list} from '@/api/join'

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
    },
    handleGetJoinList ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_join_list(pageNum, pageSize).then(res => {
          resolve(res.data.body)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}