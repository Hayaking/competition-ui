import { export_enter_excel, get_enter_list_by_competition_id } from '@/api/enter'

export default {
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {
    handleGetEnterListByCompetitionId ({ commit }, { pageNum, pageSize, competitionId }) {
      return new Promise((resolve, reject) => {
        get_enter_list_by_competition_id(pageNum, pageSize, competitionId).then(res => {
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
    handleExportEnterExcel ({ commit }, { competitionId }) {
      return new Promise((resolve, reject) => {
        export_enter_excel(competitionId).then(res => {
          resolve(res.data.state === 'SUCCESS')
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
