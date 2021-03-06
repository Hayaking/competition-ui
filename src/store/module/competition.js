import {
  delete_competition,
  get_competition5_by_type_id,
  get_competition_all,
  get_competition_by_group_id,
  get_competition_by_id,
  get_competition_pass_all, get_home_competition,
  get_simple_competition_list_by_group_id,
  save_competition_holder,
  search_competition,
  search_pass_competition,
  set_competition_enter_state,
  set_competition_state,
  update_competition
} from '@/api/competition'

export default {
  state: {
    competition_for_enter: {},
    /* 工作组查看报名列表时 使用 */
    competition_for_enter_list: {},
    /**
     * 工作组查看比赛结果时使用
     */
    competition_for_result_list: {},
    /* form1的 */
    competition_for_create: {},
    simple_competition_list: []
  },
  mutations: {
    setEnterCompetition (state, competition) {
      state.competition_for_enter = competition
    },
    setEnterListCompetition (state, competition) {
      state.competition_for_enter_list = competition
    },
    setResultListCompetition (state, competition) {
      state.competition_for_result_list = competition
    },
    setCreateCompetition (state, competition) {
      state.competition_for_create = competition
    },
    setSimpleCompetitionList (state, competition) {
      state.simple_competition_list = competition
    }
  },
  getters: {
    getEnterCompetition: state => state.competition_for_enter,
    getEnterListCompetition: state => state.competition_for_enter_list,
    getResultListCompetition: state => state.competition_for_result_list,
    getCreateCompetition: state => state.competition_for_create,
    getSimpleCompetitionList: state => state.simple_competition_list
  },
  actions: {
    handleGetCompetitionById ({ commit }, { id }) {
      return new Promise((resolve) => {
        get_competition_by_id(id).then(res => {
          if (res.data.state === 'SUCCESS') {
            commit('setEnterCompetition', res.data.body)
          }
          resolve(res.data.state === 'SUCCESS')
        })
      })
    },
    handleUpdateCompetition ({ state, commit }, { competition }) {
      return new Promise((resolve) => {
        update_competition(competition).then(res => {
          resolve(res.data.state === 'SUCCESS')
        })
      })
    },
    handleSaveCompetitionHolder ({ commit }, { competitionHolder }) {
      return new Promise((resolve, reject) => {
        save_competition_holder(competitionHolder).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
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
    handleGetCompetitionPageByGroupId ({ state, commit }, { pageNum, pageSize, groupId }) {
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
    handleGet5CompetitionByTypeId ({ state, commit }, { typeId }) {
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
    handleSetCompetitionState ({ commit }, { id, state }) {
      return new Promise((resolve) => {
        set_competition_state(id, state).then(res => {
          resolve(res.data.state === 'SUCCESS')
        })
      })
    },
    handleSetEnterState ({ state, commit }, { id, flag }) {
      return new Promise((resolve, reject) => {
        set_competition_enter_state(id, flag).then(res => {
          resolve(res.data.state === 'SUCCESS')
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
    handleGetSimpleCompetitionListByGroupId ({ commit }, { groupId }) {
      return new Promise((resolve) => {
        if (groupId === undefined) {
          resolve({
            flag: false
          })
        } else {
          get_simple_competition_list_by_group_id(groupId).then(res => {
            commit('setSimpleCompetitionList', res.data.body)
            resolve({
              flag: res.data.state === 'SUCCESS',
              body: res.data.body
            })
          })
        }
      })
    },
    handleGetHomeCompetition ({ commit }) {
      return new Promise((resolve) => {
        get_home_competition().then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
