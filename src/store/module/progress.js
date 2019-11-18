import {
  end_progress,
  get_need_review_progress_page,
  get_progress_list_by_competition_id,
  get_progress_list_by_join_id, review_result,
  save_progress,
  set_progress_result_state
} from '@/api/progress'

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
    },
    handleEndProgress ({ commit }, { id }) {
      return new Promise((resolve) => {
        end_progress(id).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleSetProgressResultState ({ commit }, { id, state }) {
      return new Promise((resolve) => {
        set_progress_result_state(id, state).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleGetNeedReviewProgressPage ({ commit }, { pageNum, pageSize }) {
      return new Promise((resolve) => {
        get_need_review_progress_page(pageNum, pageSize).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    },
    handleReviewResult ({ commit }, { id, state }) {
      return new Promise((resolve) => {
        review_result(id, state).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS'
          })
        })
      })
    }
  }
}
