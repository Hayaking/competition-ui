import {
  save_competition,
  get_competition_by_group_id,
  get_competition_all,
  set_competition_state,
  set_competition_enter_state
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
        get_competition_by_group_id(pageNum, pageSize, groupId).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetAll ({ state, commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_competition_all(pageNum, pageSize).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSetState ({ state, commit }, { id, flag }) {
      return new Promise((resolve, reject) => {
        set_competition_state(id, flag).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleSetEnterState ({ state, commit }, { id, flag }) {
      return new Promise((resolve, reject) => {
        set_competition_enter_state(id, flag).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(true)
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
