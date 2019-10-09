import {
  save_competition,
  delete_competition,
  get_competition_by_group_id,
  get_competition5_by_type_id,
  get_competition_all,
  set_competition_state,
  set_competition_enter_state,
  search_competition,
  get_competition_pass_all,
  search_pass_competition,
  get_competition_by_id, get_competition_word
} from '@/api/competition'

export default {
  state: {
    temp_competition: {}
  },
  mutations: {
    setTempCompetition (state, competition) {
      state.temp_competition = competition
    }
  },
  getters: {
    getTempCompetition: state => state.temp_competition
  },
  actions: {
    handleGetCompetitionById ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        get_competition_by_id(id).then(res => {
          if (res.data.state === 'SUCCESS') {
            commit('setTempCompetition', res.data.body)
          }
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
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
    handleGetAllCompetition ({ state, commit }, { pageNum, pageSize }) {
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
    handleGetAllPassCompetition ({ state, commit }, { pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        get_competition_pass_all(pageNum, pageSize).then(res => {
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
    },
    handleSearchPassCompetition ({ commit }, { key, pageNum, pageSize }) {
      return new Promise((resolve, reject) => {
        search_pass_competition(key, pageNum, pageSize).then(res => {
          if (res.data.state === 'SUCCESS') {
            resolve(res.data.body)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetCompetitionWord ({ commit }, { competitionId }) {
      return new Promise((resolve, reject) => {
        get_competition_word(competitionId).then(res => {
          let val = res.headers['content-disposition'] + ''
          const blob = new Blob([res.data])
          const fileName = val.substring(val.indexOf('filename=') + 'filename='.length, val.length)
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
