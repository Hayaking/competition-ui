import {
  save_competition,
  get_by_group_id
} from '@/api/competition'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    saveCompetition ({ state, commit }, { cp }) {
      return new Promise((resolve, reject) => {
        save_competition(cp).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetByGroupId ({ state, commit }, { pageNum, pageSize, groupId }) {
      return new Promise((resolve, reject) => {
        get_by_group_id(pageNum, pageSize, groupId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
