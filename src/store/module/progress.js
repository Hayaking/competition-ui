import { submit_progress_list } from '@/api/progress'

export default {
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    handleSubmitProcessList ({ commit }, { processes }) {
      return new Promise((resolve, reject) => {
        submit_progress_list(processes).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
