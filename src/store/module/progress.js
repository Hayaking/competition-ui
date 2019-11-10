import { get_progress_list_by_competition_id, get_progress_list_by_join_id, save_progress } from '@/api/progress'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleGetProgressListByCompetitionId ({ commit }, { competitionId }) {
      return new Promise((resolve, reject) => {
        get_progress_list_by_competition_id(competitionId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetProgressListByJoinId ({ commit }, { joinId }) {
      return new Promise((resolve) => {
        get_progress_list_by_join_id(joinId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleSaveProgress ({ commit }, { progress }) {
      return new Promise((resolve, reject) => {
        save_progress(progress).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
