import { create_process, get_process_list_by_join_id, get_process_list_by_progress_id } from '@/api/process'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleCreateProcess ({ commit }, { process }) {
      return new Promise((resolve, reject) => {
        create_process(process).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetProcessListByCompetitionId ({ commit }, { pageNum, pageSize, competitionId }) {
      return new Promise((resolve, reject) => {
        get_process_list_by_join_id(pageNum, pageSize, competitionId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleGetProcessListByProgressId ({ commit }, { progressId }) {
      return new Promise((resolve) => {
        get_process_list_by_progress_id(progressId).then(res => {
          resolve({
            flag: res.data.state === 'SUCCESS',
            body: res.data.body
          })
        })
      })
    }
  }
}
