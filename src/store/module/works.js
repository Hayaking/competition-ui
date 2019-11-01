import { create_works, get_works_list_by_group_id } from '@/api/work'

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
    },
    handleGetWorksList ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        if (groupId === undefined) {
          resolve({
            flag: false,
            body: '系统异常'
          })
        } else {
          get_works_list_by_group_id(groupId).then(res => {
            resolve({
              flag: res.data.state === 'SUCCESS',
              body: res.data.body
            })
          }).catch(err => {
            reject(err)
          })
        }
      })
    }
  }
}
