import {
  save_competition,
  delete_competition,
  get_competition_by_group_id,
  get_competition5_by_type_id,
  get_competition_all,
  set_competition_state,
  set_competition_enter_state, search_competition
} from '@/api/competition'

export default {
  state: {
  },
  mutations: {

  },
  getters: {

  },
  actions: {
    saveCompetition ({ state, commit }, { competition }) {
      return new Promise((resolve, reject) => {
        save_competition(competition).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleDeleteCompetition ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        delete_competition(id).then(res => {
          resolve(res.data.state === 'SUCCESS')
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
    handleGet5ByTypeId ({ state, commit }, { typeId }) {
      return new Promise((resolve, reject) => {
        get_competition5_by_type_id(typeId).then(res => {
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
    },
    handleSearchCompetition ({ commit }, { key, pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        search_competition(key, pageNum, pageSize).then(res => {
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
